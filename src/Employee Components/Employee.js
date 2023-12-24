import { useState } from "react";

const Employee = () => {
    const [data, setData] = useState({
        "name": "",
        "department": "",
        "position": ""
    })




    const sendEmployeeInfo = () => {
        console.log(data["department"], data["name"], data["position"])

        const options = {
            method: 'POST',
            body: JSON.stringify({

                "employeeName": data["name"],
                // "employeeID": "4", will be assigned on backend
                "employeeDepartment": "Backend",
                "employeePosition": "Striker"

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        // Complete once SK finishes the auto increment id

    }
    return (
        <div className="flex flex-col items-center justify-center mt-5 w-full">
            <h2 className="font-semibold text-4xl text-blue-500">Manage Employees</h2>

            <button className="shadow-lg p-3 font-semibold text-lg bg-blue-500 border-2 border-blue-400 text-white rounded-lg hover:text-blue-400 hover:bg-white  transition-all duration-200  mt-5" onClick={() => document.getElementById('my_modal_5').showModal()}>Add New Employee</button>
            <dialog id="my_modal_5" className="rounded-2xl py-10 px-20">
                <div className="modal-box ">
                    <h3 className="font-semibold text-lg text-blue-500">Enter the Employee Details!</h3>
                    <p className="py-4">Fill the form</p>
                    <label className="form-control w-full max-w-xs">
                        <div className="mt-2">
                            <span className="label-text">Full Name</span>
                        </div>
                        <input type="text" placeholder="John Doe" value={data["name"]} onChange={(e) => setData({ ...data, "name": e.target.value })}
                            className="input input-bordered input-primary w-full max-w-xs border-2 border-purple-600 rounded-md px-2 py-1" />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mt-4">
                            <span className="label-text">Employee ID</span>
                        </div>
                        <input type="text" placeholder="XXXXXXXXX" className="input input-bordered input-primary w-full max-w-xs  border-purple-500 rounded-md px-2 py-1" disabled />
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mt-4">
                            <span className="label-text">Department</span>
                        </div>
                        <select className="border-2 border-purple-600 rounded-md px-2 py-1 w-full"
                            value={data["department"]} onChange={(e) => setData({ ...data, "department": e.target.value })}>
                            <option value={"Backend"}>SWE Backend</option>
                            <option value={"Intern"}>SWE Intern</option>
                            <option value={"Frontend"}>SWE Frontend</option>
                        </select>

                        {/* <input type="text" placeholder={dept} className="border-2 border-purple-600 rounded-md px-2 py-1 input input-bordered input-primary w-full max-w-xs" disabled /> */}
                    </label>
                    <label className="form-control w-full max-w-xs">
                        <div className="label mt-4">
                            <span className="label-text">Position</span>
                        </div>
                        <input type="text" placeholder="Position" value={data["position"]} onChange={(e) => setData({ ...data, "position": e.target.value })}
                            className="border-2 border-purple-600 rounded-md px-2 py-1 input input-bordered input-primary w-full max-w-xs" />
                    </label>
                    <div className="modal-action text-center">
                        <form method="dialog">
                            <button className="shadow-lg p-2 mt-6  text-md bg-blue-400  text-white rounded-lg  hover:bg-blue-500   transition-all duration-200"
                                onClick={sendEmployeeInfo}>Add Employee</button>
                            <button className="absolute right-5 top-5">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export { Employee }