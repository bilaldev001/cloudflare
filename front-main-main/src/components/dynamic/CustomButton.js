const CustomButton = ({ onClick, children, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
