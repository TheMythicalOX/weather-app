const ChangeUnits = (props) => {
  const sign = props.sign;
  const handleUnits = props.handleUnits;
  return (
    // changes units from F to C or vice versa
    <div className="change-units">
      {/* display when F is selected */}
      {sign === "F" && (
        <div
          onClick={() => {
            handleUnits("C");
          }}
          className="sign-button-box"
        >
          <h1 className="disabled sign-button">°F</h1>
          <h1 className="sign-button">|°C</h1>
        </div>
      )}
      {/* display when C is selected */}
      {sign === "C" && (
        <div
          onClick={() => {
            handleUnits("F");
          }}
          className="sign-button-box"
        >
          <h1 className="sign-button">°F|</h1>
          <h1 className="disabled sign-button">°C</h1>
        </div>
      )}
    </div>
  );
};

export default ChangeUnits;
