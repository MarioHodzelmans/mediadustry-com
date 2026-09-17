import Footer3 from "@/components/footers/Footer3";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <div className="mxd-page-content inner-page-content"> */}
      {children}
      {/* </div> */}
      <Footer3 />
    </>
  );
}
