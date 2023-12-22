export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify("succes"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    return new Response(JSON.stringify("succes"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    return new Response(JSON.stringify("succes"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    return new Response(JSON.stringify("succes"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
