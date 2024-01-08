import countryCodes from "@/app/country-codes.json";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PhoneItem = {
	name: string;
	image: string;
	phone: string;
	phoneLength: number;
};

const initialItem: PhoneItem = {
	name: "India",
	phone: "+91",
	image:
		"https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg",
	phoneLength: 10,
};

export const InputPhone = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedItem, setSelectedItem] = useState<PhoneItem>(initialItem);
	const [error, setError] = useState<string | null>(null);
	const [phoneNumber, setPhoneNumber] = useState("");

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

	useEffect(() => {
		if (phoneNumber.length !== selectedItem.phoneLength) {
			setError("Invalid phone number");
		} else {
			setError(null);
		}
	}, [phoneNumber]);

	return (
		<div className="flex relative flex-col gap-2 w-full">
			<div className="bg-white rounded-md overflow-hidden w-full items-center flex gap-2">
				<div
					onClick={(e) => {
						e.stopPropagation();
						setIsOpen(!isOpen);
					}}
					className=" flex gap-1 border-r-2 border-black bg-gray-300 w-full"
				>
					<Image
						src={selectedItem.image as string}
						alt="image"
						height={1000}
						width={1000}
						className="w-6 h-6"
					/>
					<h1 className="inline">{selectedItem.phone}</h1>
				</div>
				<input
					className="focus:outline-none p-1 bg-red-500"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			</div>
			{error ? <h1 className="text-red-500 text-sm">{error}</h1> : null}
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
										phoneLength: item.phoneLength as number,
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
