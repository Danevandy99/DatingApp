using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotosAsync();
        Task<Photo> GetPhotoByIdAsync(int photoId);
        void RemovePhoto(Photo photo);
    }
}