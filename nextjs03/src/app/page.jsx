import localFont from "next/font/local";
import Youtube from "./_components/Youtube";
import dynamic from "next/dynamic";
const svnFontbox = localFont({
  src: "../assets/fonts/SVN-Fontbox.otf",
});
const Demo = dynamic(() => import("./_components/Demo"), {
  loading: () => <p>Loading...</p>,
});
export default function Home() {
  return (
    <div className="w-1/2 mx-auto py-3">
      <h1 className="text-3xl">
        Khóa học{" "}
        <span className={`${svnFontbox.className} text-5xl`}>nổi bật</span> tại
        F8
      </h1>
      <Youtube />
      <Demo />
    </div>
  );
}
