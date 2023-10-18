const CustomInputField = ({ label, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={field.name}
          className={`form-label ${props.specialclass} fw-bold`}
        >
          {label}
        </label>
      )}
      <input {...props} />
      {/**<ErrorMessage component='small' name={field.name} className='text-danger' />**/}
    </div>
  );
};

export default CustomInputField;
