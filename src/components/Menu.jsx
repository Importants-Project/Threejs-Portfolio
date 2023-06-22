export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        className="z-20 fixed top-12 right-12 p-3 bg-indigo-600 w-11 h-11 rounded-md"
        onClick={() => setMenuOpened(!menuOpened)}
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "rotate-45 translate-y-0.5" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpened ? "hidden" : ""
          }`}
        />
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpened ? "-rotate-45 " : ""
          }`}
        />
      </button>

      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col ${
          menuOpened ? "w-80 " : "w-0"
        }`}
      >
        <div>
          <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
            <MenuButton onClick={() => onSectionChange(0)} lable="About" />
            <MenuButton onClick={() => onSectionChange(1)} lable="Skills" />
            <MenuButton onClick={() => onSectionChange(2)} lable="Projects" />
            <MenuButton onClick={() => onSectionChange(3)} lable="Contact" />

          </div>
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { lable, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer hover:text-indigo-600 transition-colors"
    >
      {lable}
    </button>
  );
};
