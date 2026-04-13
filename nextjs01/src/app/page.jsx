import Button from "./_components/Button";
export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl">Home</h1>
      <Button count={10} />
    </div>
  );
}

//Mặc định chạy trên server
