import './profile.styles.scss';

const Profile = ({ image, nickname }) => {
  return (
    <div className="profile-body">
      <div className="profile-body__img">
        <img src={image} alt={nickname} />
      </div>
      <div className="profile-body__details">
        <h3 className="profile-body__nickname">{nickname}</h3>
      </div>
    </div>
  );
};

export default Profile;
