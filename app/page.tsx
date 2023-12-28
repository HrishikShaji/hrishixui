import { ColorPicker } from "./components/ColorPicker";

export default function Home() {
  return (
    <main className="min-h-screen py-5 w-full bg-neutral-700 flex flex-col items-center justify-start">
      <ColorPicker />
    </main>
  );
}
