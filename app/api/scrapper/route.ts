import { JSDOM } from "jsdom";

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
		const dom = new JSDOM(html);
		const document = dom.window.document;
		const title = document.querySelector("title");
		const links = document.querySelectorAll("link");
		const link = Array.from(links).filter((link) => link.rel === "icon");
		console.log(link[0].href);
		return new Response(JSON.stringify(html), { status: 200 });
	} catch (error: any) {
		return new Response(JSON.stringify(error.message), { status: 500 });
	}
}
