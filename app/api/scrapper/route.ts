export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("in the backend", body);
    const data = Promise.resolve(body.url);
    console.log(data);
    return new Response(JSON.stringify(JSON.stringify(data)), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
