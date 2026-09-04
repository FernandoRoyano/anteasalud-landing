---
name: Codex-api
description: Integración Codex API (Anthropic SDK). Modelos opus-4-7/sonnet-4-6/haiku-4-5, streaming, prompt caching, structured outputs con Zod, tool use, batch API, vision, PDFs, system prompts. Usar cuando integres IA en la app.
---

# SKILL: Codex API

> Integración de IA: streaming, caching, structured outputs, batch, tools.

---

## 🔌 Setup

```typescript
// lib/Codex.ts
import Anthropic from '@anthropic-ai/sdk'

export const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const MODELS = {
  fast:     'Codex-haiku-4-5-20251001',   // ultra rápido, muy barato
  balanced: 'Codex-sonnet-4-6',            // uso general, recomendado default
  powerful: 'Codex-opus-4-7',              // máxima calidad
} as const

export type ModelKey = keyof typeof MODELS
```

---

## 💬 Llamada simple

```typescript
// app/api/ai/route.ts
import { anthropic, MODELS, type ModelKey } from '@/lib/Codex'
import { requireUser } from '@/lib/auth/guards'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    await requireUser()
    const { message, systemPrompt, model = 'balanced' } = await request.json() as {
      message: string; systemPrompt?: string; model?: ModelKey
    }

    const response = await anthropic.messages.create({
      model: MODELS[model],
      max_tokens: 1024,
      system: systemPrompt ?? 'Responde en español, de forma concisa.',
      messages: [{ role: 'user', content: message }],
    })

    const text = response.content.find(b => b.type === 'text')?.text ?? ''
    return NextResponse.json({ response: text, usage: response.usage })
  } catch (e) {
    console.error('[AI:POST]', e)
    return NextResponse.json({ error: 'AI request failed' }, { status: 500 })
  }
}
```

---

## 🌊 Streaming — UX tipo ChatGPT

```typescript
// app/api/ai/stream/route.ts
import { anthropic, MODELS } from '@/lib/Codex'
import { requireUser } from '@/lib/auth/guards'

export async function POST(request: Request) {
  try {
    await requireUser()
    const { messages, systemPrompt } = await request.json()

    const stream = await anthropic.messages.stream({
      model: MODELS.balanced,
      max_tokens: 2048,
      system: systemPrompt,
      messages,
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text))
            }
          }
          controller.close()
        } catch (e) {
          controller.error(e)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (e) {
    return new Response('Unauthorized', { status: 401 })
  }
}
```

---

## 🪝 Hook `useChat` — reutilizable

```typescript
// hooks/useChat.ts
'use client'
import { useState, useCallback } from 'react'

interface Message { role: 'user' | 'assistant'; content: string }

interface UseChatOptions {
  endpoint?: string
  systemPrompt?: string
  onError?: (error: Error) => void
  onFinish?: (message: Message) => void
}

export function useChat({ endpoint = '/api/ai/stream', systemPrompt, onError, onFinish }: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const send = useCallback(async (content: string) => {
    const userMsg: Message = { role: 'user', content }
    const next = [...messages, userMsg]
    setMessages([...next, { role: 'assistant', content: '' }])
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, systemPrompt }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        assistantContent += chunk
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantContent }
          return updated
        })
      }

      onFinish?.({ role: 'assistant', content: assistantContent })
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Unknown error')
      setError(err.message)
      onError?.(err)
      setMessages(prev => prev.slice(0, -1))  // eliminar placeholder
    } finally {
      setLoading(false)
    }
  }, [messages, endpoint, systemPrompt, onError, onFinish])

  const clear = () => setMessages([])

  return { messages, loading, error, send, clear }
}
```

---

## 💰 Prompt caching — hasta 90% ahorro

```typescript
// Cachea prompts largos que se repiten entre requests
const response = await anthropic.messages.create({
  model: MODELS.powerful,
  max_tokens: 2048,
  system: [
    {
      type: 'text',
      text: `Eres un asistente experto en [contexto muy largo aquí]...
        [...documentación larga, instrucciones detalladas, ejemplos...]`,
      cache_control: { type: 'ephemeral' }, // cachea 5 min
    },
  ],
  messages: [{ role: 'user', content: userMessage }],
})

// Verificar hit de caché
if (response.usage.cache_read_input_tokens && response.usage.cache_read_input_tokens > 0) {
  console.log('✓ Cache hit — ahorro aplicado')
}
```

---

## 📋 Structured outputs — JSON garantizado

```typescript
// Opción 1: Prompt explícito
const response = await anthropic.messages.create({
  model: MODELS.balanced,
  max_tokens: 1024,
  system: `Responde SOLO con JSON válido. Sin markdown, sin texto adicional.

Schema:
{
  "title": string,
  "summary": string,
  "tags": string[],
  "sentiment": "positive" | "neutral" | "negative"
}`,
  messages: [{ role: 'user', content: textToAnalyze }],
})

const text = response.content.find(b => b.type === 'text')?.text ?? '{}'
const result = JSON.parse(text)  // usar try/catch en producción

// Opción 2: Prefill assistant — garantiza inicio JSON
const response2 = await anthropic.messages.create({
  model: MODELS.balanced,
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Analiza: ...' },
    { role: 'assistant', content: '{' },  // ← fuerza JSON
  ],
})
const firstBlock = response2.content[0]
const text2 = '{' + (firstBlock.type === 'text' ? firstBlock.text : '')
```

### Con Zod para validar

```typescript
import { z } from 'zod'

const AnalysisSchema = z.object({
  title: z.string(),
  summary: z.string(),
  tags: z.array(z.string()),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
})

async function analyzeText(text: string) {
  const response = await anthropic.messages.create({ /* ... */ })
  const raw = response.content[0].type === 'text' ? response.content[0].text : '{}'

  try {
    const parsed = AnalysisSchema.parse(JSON.parse(raw))
    return { ok: true as const, data: parsed }
  } catch (e) {
    return { ok: false as const, error: 'Invalid response format' }
  }
}
```

---

## 🔧 Tool use — function calling

```typescript
const response = await anthropic.messages.create({
  model: MODELS.powerful,
  max_tokens: 2048,
  tools: [
    {
      name: 'get_workout_stats',
      description: 'Retrieve workout statistics for the current user',
      input_schema: {
        type: 'object',
        properties: {
          timeframe: { type: 'string', enum: ['week', 'month', 'year'] },
        },
        required: ['timeframe'],
      },
    },
  ],
  messages: [{ role: 'user', content: 'Cómo fue mi mes en entrenamientos?' }],
})

// Codex responde con un tool_use block
const toolUse = response.content.find(b => b.type === 'tool_use')
if (toolUse) {
  const result = await getWorkoutStats(toolUse.input)  // función real
  // Segunda llamada para que Codex genere respuesta con el resultado
  const followup = await anthropic.messages.create({
    model: MODELS.powerful,
    max_tokens: 2048,
    tools: [/* mismo schema */],
    messages: [
      { role: 'user', content: 'Cómo fue mi mes en entrenamientos?' },
      { role: 'assistant', content: response.content },
      { role: 'user', content: [{ type: 'tool_result', tool_use_id: toolUse.id, content: JSON.stringify(result) }] },
    ],
  })
}
```

---

## 📦 Batch API — 50% descuento para tareas async

```typescript
// Para procesar muchos items sin urgencia
const batch = await anthropic.messages.batches.create({
  requests: items.map((item, i) => ({
    custom_id: `item-${item.id}`,
    params: {
      model: MODELS.balanced,
      max_tokens: 512,
      messages: [{ role: 'user', content: `Analiza: ${item.text}` }],
    },
  })),
})

console.log('Batch ID:', batch.id)

// Consultar resultado (puede tardar hasta 24h)
const result = await anthropic.messages.batches.retrieve(batch.id)
if (result.processing_status === 'ended') {
  const results = await anthropic.messages.batches.results(batch.id)
  for await (const entry of results) {
    console.log(entry.custom_id, entry.result)
  }
}
```

---

## 🖼️ Vision — analizar imágenes

```typescript
const response = await anthropic.messages.create({
  model: MODELS.balanced,
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: [
      {
        type: 'image',
        source: { type: 'base64', media_type: 'image/jpeg', data: base64Image },
      },
      { type: 'text', text: 'Describe este ejercicio y da consejos de forma' },
    ],
  }],
})

// O desde URL:
content: [
  { type: 'image', source: { type: 'url', url: 'https://...' } },
  { type: 'text', text: '...' },
]
```

---

## 📄 Documentos — PDFs

```typescript
const response = await anthropic.messages.create({
  model: MODELS.powerful,
  max_tokens: 2048,
  messages: [{
    role: 'user',
    content: [
      {
        type: 'document',
        source: { type: 'base64', media_type: 'application/pdf', data: base64Pdf },
      },
      { type: 'text', text: 'Extrae los puntos clave' },
    ],
  }],
})
```

---

## 💡 System prompts por caso

```typescript
// lib/Codex/prompts.ts
export const SYSTEM_PROMPTS = {
  // Asistente general conversacional
  general: `Eres un asistente útil. Responde en español, conciso y directo. Si no sabes algo, dilo.`,

  // Análisis de contenido
  analyzer: (context: string) => `Eres un analista experto en ${context}.
Analiza objetivamente basándote en evidencia.
Responde en español con estructura clara.`,

  // Asistente técnico
  developer: `Eres un senior engineer. Stack: Next.js, TypeScript, Supabase.
Responde con código funcional, tipado, sin explicaciones de relleno.
Usa markdown fences con lenguaje en el bloque de código.`,

  // Coach / educador
  coach: (domain: string) => `Eres un coach experto en ${domain}.
Empática, motivadora, basada en evidencia.
Nunca sustituyas consejo médico/legal/financiero profesional.`,
}
```

---

## 💵 Costes orientativos (abril 2026)

| Modelo | Input | Output | Con caché |
|---|---|---|---|
| Haiku 4.5 | $1 /M | $5 /M | -90% |
| Sonnet 4.6 | $3 /M | $15 /M | -90% |
| Opus 4.7 | $5 /M | $25 /M | -90% |
| Batch API | -50% | -50% | combina con caché |

**Estrategia:**
- Default: `sonnet-4-6` para todo
- `haiku-4-5` para clasificación, búsqueda, tareas simples
- `opus-4-7` solo para razonamiento complejo o código crítico
- Siempre caching en system prompts > 1024 tokens
- Batch para procesamientos no-tiempo-real
