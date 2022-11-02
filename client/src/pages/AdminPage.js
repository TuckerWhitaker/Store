import "./AdminPage.css";

function AdminPage() {
  return (
    <div className="AdminPage">
      <div className="AdminInParent">
        <label className="AdminLabel">Name: </label>
        <input className="AdminInput"></input>
      </div>
      <div className="AdminInParent">
        <label className="AdminLabel">Description: </label>
        <textarea className="AdminInput" id="description"></textarea>
      </div>
      <div className="AdminInParent">
        <label className="AdminLabel">Price: </label>
        <input type="number" className="AdminInput"></input>
      </div>
      <div className="AdminInParent">
        <div className="AdminOptionContainer"></div>
        <input className="AdminInput"></input>
        <button>Add Option</button>
        <input className="AdminInput"></input>
        <button>Add Value to Selected Option</button>
      </div>
    </div>
  );
}

export default AdminPage;
