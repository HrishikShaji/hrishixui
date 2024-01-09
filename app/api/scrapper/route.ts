export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const url = searchParams.get("url");
		console.log("its here", url);
		if (!url) {
			return new Response(JSON.stringify("failed"), {
				status: 400,
			});
		}
		const data = await fetch(url);
		const html = await data.text();
		console.log(html);
		return new Response(JSON.stringify(JSON.stringify(html)), { status: 200 });
	} catch (error: any) {
		return new Response(JSON.stringify(error.message), { status: 500 });
	}
}
