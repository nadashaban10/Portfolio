import { LuArrowUp } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="to-top" href="#top" aria-label="Back to top">
        <LuArrowUp aria-hidden="true" />
      </a>
    </footer>
  );
}
