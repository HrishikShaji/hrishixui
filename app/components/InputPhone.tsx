import countryCodes from "@/app/country-codes.json";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PhoneItem = {
	name: string;
	image: string;
	phone: string;
};

const initialItem: PhoneItem = {
	name: "India",
	phone: "+91",
	image:
		"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
};

export const InputPhone = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedItem, setSelectedItem] = useState<PhoneItem>(initialItem);

	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (containerRef.current) {
			const elements =
				containerRef.current.getElementsByClassName("country-item");
			for (let i = 0; i < elements.length; i++) {
				const name = elements[i].getAttribute("data-name");
				if (name && name.toLowerCase().includes(search.toLowerCase())) {
					elements[i].scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
					break;
				}
			}
		}
	}, [search]);
	return (
		<div className="flex relative flex-col gap-2">
			<div className="relative">
				<div className="absolute left-0 z-1 flex gap-1">
					<Image
						src={selectedItem.image as string}
						alt="image"
						height={1000}
						width={1000}
						className="w-6 h-6"
					/>
					<h1>{selectedItem.phone}</h1>
				</div>
				<input onClick={() => setIsOpen(!isOpen)} />
			</div>
			{isOpen ? (
				<div className="absolute top-10 rounded-md w-[300px] bg-white overflow-hidden">
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search..."
						className="w-full focus:outline-none p-1"
					/>
					<div
						ref={containerRef}
						className="h-[500px] w-full  flex flex-col overflow-y-scroll"
					>
						{countryCodes.map((item) => (
							<div
								onClick={() =>
									setSelectedItem({
										name: item.name,
										phone: item.phone[0],
										image: item.image,
									})
								}
								key={item.name}
								className="country-item flex hover:bg-gray-300 cursor-pointer items-center gap-2 text-sm p-1"
								data-name={item.name}
							>
								<Image
									src={item.image as string}
									alt="image"
									height={1000}
									width={1000}
									className="w-6 h-6"
								/>
								<h1 className=" inline-flex">{item.name}</h1>
								<h1>{item?.phone ? item.phone[0] : "none"}</h1>
							</div>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};
