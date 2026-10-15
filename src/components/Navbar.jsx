function Navbar() {
  return (
    <nav className="flex h-16 items-center border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center">
            <img src="/trainIcon.png" alt="Train icon" className="h-10 w-10 object-contain"/>
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            Dutch Railway Analytics
          </h1>

          <p className="text-xs text-slate-500">
            OLAP Application Dashboard
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
