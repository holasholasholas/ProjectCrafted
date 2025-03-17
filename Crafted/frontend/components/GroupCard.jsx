const GroupCard = ({ group, onView, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <div className="h-24 w-24 text-gray-400" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{group.role}</h3>
        <p className="text-gray-600 mb-3">{group.members?.length || 0} members</p>
        
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex justify-between">
          
            <button
              onClick={() => onDelete(group.id)}
              className="flex items-center text-red-600 hover:text-red-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;