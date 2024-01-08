import countryCodes from "@/app/country-codes.json";
import Image from "next/image";

export const InputPhone = () => {
  return (
    <div>
      <input />
      <div>
        {countryCodes.map((item) => (
          <div
            key={item.name}
            className="flex w-[400px] items-center gap-2 text-sm bg-white p-1 rounded-md"
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
  );
};
