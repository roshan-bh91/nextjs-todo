import Link from "next/link";
import { useRouter } from "next/router";
const LinksGroup = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center bg-red-200 gap-y-2">
      <Link href="/todoapp/archived">
        <p
          className={`
            ${router.pathname === "/todoapp/archived" ? "text-lime-500" : ""}
          `}
        >
          Archived
        </p>
      </Link>
      <Link href="/todoapp/completed">
        <p
          className={
            router.pathname === "/todoapp/completed" ? "text-lime-500" : ""
          }
        >
          Completed
        </p>
      </Link>
      <Link href="/">
        <p className={router.pathname === "/" ? "text-lime-500" : ""}>
          Pending
        </p>
      </Link>
    </div>
  );
};
export { LinksGroup };
