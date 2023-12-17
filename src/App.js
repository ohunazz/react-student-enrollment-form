import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

const App = () => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [className, setClassName] = useState("");
    const [inputError, setInputError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleOnChangeFirstName = (e) => {
        const { value } = e.target;
        setFirstName(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleOnChangeLastName = (e) => {
        const { value } = e.target;
        setLastName(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleOnChangeEmail = (e) => {
        const { value } = e.target;
        setEmail(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const handleOnChangeClassName = (e) => {
        const { value } = e.target;
        setClassName(value);

        if (value.length <= 1) {
            setInputError(true);
        } else {
            setInputError(false);
        }
    };

    const addStudent = (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !className) {
            setInputError(true);
            return;
        }

        const newStudent = {
            id: uuid(),
            firstName,
            lastName,
            email,
            className
        };

        setStudents((prevState) => [...prevState, newStudent]);
        setFirstName("");
        setLastName("");
        setEmail("");
        setClassName("");
    };

    const deleteStudent = (studentId) => {
        const keptStudents = students.filter(
            (student) => student.id !== studentId
        );
        setStudents(keptStudents);
        setShowModal(false);
    };

    const editStudent = (studentId) => {
        const selectedStudent = students.find(
            (student) => student.id === studentId
        );
        setShowModal(true);
        setSelectedStudent(selectedStudent);
    };

    const submitEdit = () => {
        const updatedStudents = students.map((student) => {
            if (student.id === selectedStudent.id) {
                return {
                    ...student,
                    firstName,
                    lastName,
                    email,
                    className
                };
            }
            return student;
        });
        setStudents(updatedStudents);
        setShowModal(false);
    };

    return (
        <main>
            <h1>Student Enrollment Form</h1>
            <form onSubmit={addStudent}>
                <input
                    onChange={handleOnChangeFirstName}
                    value={firstName}
                    type="text"
                    placeholder="First name"
                />
                <br />
                <br />
                <input
                    onChange={handleOnChangeLastName}
                    value={lastName}
                    type="text"
                    placeholder="Last name"
                />
                <br />
                <br />
                <input
                    onChange={handleOnChangeEmail}
                    value={email}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <br />
                <select
                    name="className"
                    value={className}
                    onChange={handleOnChangeClassName}
                >
                    <option value="">Select Class</option>
                    <option value="Statistics">Statistics</option>
                    <option value="History">History</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Literature">Literature</option>
                </select>
                <br />
                <br />
                <input type="submit" value="Add Student" />
                {inputError && <span>Please fill all fields</span>}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.className}</td>
                            <td>
                                <button
                                    onClick={() => deleteStudent(student.id)}
                                    className="delete"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => editStudent(student.id)}
                                    className="edit"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <div>
                        <input
                            value={selectedStudent.firstName}
                            onChange={handleOnChangeFirstName}
                            type="text"
                            placeholder="firstName"
                        />
                        <input
                            value={selectedStudent.lastName}
                            onChange={handleOnChangeLastName}
                            type="text"
                            placeholder="lastName"
                        />
                        <input
                            value={selectedStudent.email}
                            onChange={handleOnChangeEmail}
                            type="text"
                            placeholder="email"
                        />
                        <input
                            value={selectedStudent.className}
                            onChange={handleOnChangeClassName}
                            type="text"
                            placeholder="classtName"
                        />

                        <button
                            type="button"
                            onClick={submitEdit}
                            className="save-btn"
                        >
                            Save
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default App;
