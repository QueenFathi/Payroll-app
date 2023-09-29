export default function StaffTimesheet() {
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  function groupDays(data) {
    const groupedData = {};
    data.forEach((item) => {
      const { day, value } = item;
      if (!groupedData[day]) {
        groupedData[day] = { day, values: [] };
      }
      groupedData[day].values.push(value);
    });
    return Object.values(groupedData);
  }
  const getAllInputValues = (e) => {
    e.preventDefault();
    const inputElements = e.target.querySelectorAll("input");
    const values = [];

    inputElements.forEach((input) => {
      if (input?.type === "text") {
        values.push({ day: input.id, value: input.value });
      }
    });
    const groupedDays = groupDays(values);
    console.log(groupedDays);
  };

  return (
    <div className="container-lg">
      <div className="d-flex justify-content-between pb-2 pt-3 px-3 bg-light rounded">
        <h3>Weekly Timesheet</h3>
        <h4>{dateBuilder(new Date())}</h4>
      </div>
      <div className="mt-4 pb-2 pt-3 px-3 bg-light rounded">
        <div className="row">
          <div className="col-sm-6">
            <p>Week start: 11/09/2023</p>
            <p>Regular Hours: 9 hours</p>
            <p>Department: Production</p>
          </div>
          <div className="col-sm-6">
            <p>Employee: John Doe</p>
            <p>Supervisor: John Doe</p>
            <p>Designation: Production Manager</p>
          </div>
        </div>
      </div>
      <div className="my-4">
        <form onSubmit={getAllInputValues}>
          <div className="table-responsive rounded">
            <table className="table table-bordered table-light">
              <thead>
                <tr>
                  <th>Days</th>
                  <th>Sign In</th>
                  <th>Sign Out</th>
                  <th>Overtime Hours</th>
                  <th>Casual/Sick Leave</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label for="monday" className="form-label">
                      Monday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="monday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="monday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="monday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="monday"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="tuesday" className="form-label">
                      Tuesday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="tuesday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="tuesday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="tuesday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="tuesday"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="wednesday" className="form-label">
                      Wednesday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="wednesday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="wednesday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="wednesday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="wednesday"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="thursday" className="form-label">
                      Thursday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="thursday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="thursday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="thursday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="thursday"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="friday" className="form-label">
                      Friday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="friday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="friday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="friday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="friday"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="saturday" className="form-label">
                      Saturday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="saturday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="saturday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="saturday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="saturday"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label for="sunday" className="form-label">
                      Sunday
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="sunday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="sunday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="sunday"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control border-0 rounded-0"
                      id="sunday"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="my-4">
            <button className="d-flex ms-auto me-lg-5 px-5 btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
