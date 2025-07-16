function EwasteCard({ image, type, postedBy = 'Unknown User', description, profilePic }) {
  return (
    <div className="w-[90vw] max-w-3xl h-[150px] bg-[#2c2f33] text-white rounded-xl shadow-md flex overflow-hidden hover:scale-[1.01] transition-transform">
      {/* E-waste Image */}
      <img
        src={image}
        alt={type}
        className="h-full w-[150px] object-cover"
      />

      {/* Details */}
      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold">{type}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>

        {/* Posted By with Profile Pic */}
        <div className="flex items-center gap-2 mt-2">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              title={postedBy}
              className="w-6 h-6 rounded-full object-cover border border-gray-500"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
              ?
            </div>
          )}
          <p className="text-sm text-gray-400">Posted by: {postedBy}</p>
        </div>
      </div>
    </div>
  );
}

export default EwasteCard;
