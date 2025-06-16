import { UserNav } from "./UserNav";
import { ModeToggle } from "./ModeToggle";
import { Search } from "./Search";

export function AdminNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <Search />
        </div>
        <ModeToggle />
        <UserNav user={null} />
      </div>
    </header>
  );
}
