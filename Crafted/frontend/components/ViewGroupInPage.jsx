import { useState, useEffect } from "react";

const ViewGroupInPage = ({ onClose, data }) => {
  const [groupDetails, setGroupDetails] = useState({
    name: "",
    description: "",
    owner: "",
    members: "",
  });

 
  useEffect(() => {
    if (data) {
      setGroupDetails({
        name: data.name || "No name provided",
        description: data.description || "No description provided",
        owner: data.owner || "No owner specified",
        members: data.members || "No members added",
      });
    }
  }, [data]);

 
  if (!data) {
    return (
      <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm">
        <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm">
          <div className="relative flex flex-col bg-white">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-medium text-slate-800">
                Group Details
              </h3>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-700">
                No group data available to display.
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={onClose}
                className="w-full rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 focus:bg-slate-700 focus:shadow-none active:bg-slate-800"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-opacity-60 backdrop-blur-sm">
      <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm">
        <div className="relative flex flex-col bg-white">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-medium text-slate-800">
              Group Details
            </h3>
          </div>

          <div className="flex flex-col gap-4 p-6">
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Group Information
              </label>

              <div className="pl-2 border-l-2 border-slate-300">
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Name:</span> {groupDetails.name}
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Description:</span>{" "}
                  {groupDetails.description}
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Owner:</span>{" "}
                  {groupDetails.owner}
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-medium">Members:</span>{" "}
                  {groupDetails.members}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={onClose}
              className="w-full rounded-md bg-slate-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 focus:bg-slate-700 focus:shadow-none active:bg-slate-800"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGroupInPage;