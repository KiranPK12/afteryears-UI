import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function upstreamOrigin(): string | undefined {
  const raw = (process.env.BACKEND_PROXY_ORIGIN ?? process.env.NEXT_PUBLIC_BACKEND_URL)?.trim();
  if (!raw) return undefined;
  return raw.replace(/\/$/, '');
}

function hopByHop(name: string) {
  const n = name.toLowerCase();
  return (
    n === 'connection' ||
    n === 'keep-alive' ||
    n === 'proxy-authenticate' ||
    n === 'proxy-authorization' ||
    n === 'te' ||
    n === 'trailers' ||
    n === 'transfer-encoding' ||
    n === 'upgrade' ||
    n === 'host'
  );
}

function forwardRequestHeaders(req: NextRequest): Headers {
  const out = new Headers();
  req.headers.forEach((value, key) => {
    if (hopByHop(key)) return;
    out.set(key, value);
  });
  return out;
}

async function proxy(req: NextRequest, method: string, pathSegments: string[]) {
  const origin = upstreamOrigin();
  if (!origin) {
    return NextResponse.json({ error: 'Backend URL is not configured on the server' }, { status: 502 });
  }

  const path = pathSegments.join('/');
  const search = new URL(req.url).search;
  const target = `${origin}/${path}${search}`;

  const headers = forwardRequestHeaders(req);

  const hasBody = !['GET', 'HEAD'].includes(method);
  const body = hasBody ? await req.arrayBuffer() : undefined;

  const init: RequestInit = { method, headers };
  if (hasBody && body && body.byteLength > 0) {
    init.body = body;
  }

  const upstream = await fetch(target, init);

  const res = new NextResponse(upstream.body ?? null, { status: upstream.status });
  upstream.headers.forEach((value, key) => {
    if (hopByHop(key)) return;
    if (key.toLowerCase() === 'content-length') return;
    res.headers.set(key, value);
  });

  return res;
}

type Ctx = { params: Promise<{ path?: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, 'GET', path);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, 'POST', path);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, 'PUT', path);
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, 'PATCH', path);
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { path = [] } = await ctx.params;
  return proxy(req, 'DELETE', path);
}
