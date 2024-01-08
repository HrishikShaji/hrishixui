import countryCodes from "@/app/country-codes.json";
import Image from "next/image";
import { useState } from "react";

export const InputPhone = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="flex relative flex-col gap-2">
			<input onClick={() => setIsOpen(!isOpen)} />
			{isOpen ? (
				<div className="h-[500px] w-[300px] top-10 absolute flex flex-col overflow-y-scroll">
					{countryCodes.map((item) => (
						<div
							key={item.name}
							className="flex items-center gap-2 text-sm bg-white p-1 rounded-md"
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
			) : null}
		</div>
	);
};
