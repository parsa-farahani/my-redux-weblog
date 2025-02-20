

const formatDateAgo = (timeStampISO) => {
   const releaseDate = new Date(timeStampISO);
   const releaseDateMs = releaseDate.getTime();
   const currentDate = Date.now();
   const dateDiff = currentDate - releaseDateMs;
   let formattedDate;

   if ((dateDiff / 1000) < 60) {
      formattedDate = Math.floor(dateDiff/1000) + " secs ago";
   }
   else if ((dateDiff / 60000) < 60) {
      formattedDate = Math.floor(dateDiff/60000) + " mins ago";
   }
   else if ((dateDiff / (60 * 60000)) < 24) {
      formattedDate = Math.floor(dateDiff / (60 * 60000)) + " hours ago";
   }
   else if ((dateDiff / (24 * 60 * 60000)) < 30) {
      formattedDate = Math.floor(dateDiff / (24 * 60 * 60000)) + " days ago";
   }
   else if ((dateDiff / (30 * 24 * 60 * 60000)) < 12) {
      formattedDate = Math.floor(dateDiff / (30 * 24 * 60 * 60000)) + " months ago";
   }
   else {
      formattedDate = Math.floor(dateDiff / (12 * 30 * 24 * 60 * 60000)) + " years ago";
   }

   return formattedDate;
}


const PostDate = ( { timeStampISO } ) => {

   let formattedDate;

   if (timeStampISO) {
      formattedDate = formatDateAgo(timeStampISO);
   } else {
      return (
         <span className="text-secondary" style={{ fontSize: '.9rem' }} >
            unknown date
         </span>  
      )
   }

   return (
      <span className="text-secondary" style={{ fontSize: '.9rem' }} >
         <time dateTime={timeStampISO}>
            {
               formattedDate
            }
         </time>
      </span>
   );
}
 
export default PostDate;