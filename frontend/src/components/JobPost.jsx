




import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiBriefcase,
  FiType,
  FiMapPin,
  FiHome,
  FiFileText,
  FiList,
  FiAward,
  FiDollarSign,
  FiUsers,
  FiGlobe,
  FiLink
} from "react-icons/fi";
import { CiCircleInfo } from "react-icons/ci";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import './postjob.css';

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    jobNiche: "",
    salary: "",
    hiringMultipleCandidates: "",
    personalWebsiteTitle: "",
    personalWebsiteUrl: ""
  });

  const nichesArray = [
    { name: "Software Development", icon: <FiBriefcase /> },
    { name: "Web Development", icon: <FiBriefcase /> },
    { name: "Cybersecurity", icon: <FiBriefcase /> },
    { name: "Data Science", icon: <FiBriefcase /> },
    { name: "Artificial Intelligence", icon: <FiBriefcase /> },
    { name: "Cloud Computing", icon: <FiBriefcase /> },
    { name: "DevOps", icon: <FiBriefcase /> },
    { name: "Mobile App Development", icon: <FiBriefcase /> },
    { name: "Blockchain", icon: <FiBriefcase /> },
    { name: "Database Administration", icon: <FiBriefcase /> },
    { name: "Network Administration", icon: <FiBriefcase /> },
    { name: "UI/UX Design", icon: <FiBriefcase /> },
    { name: "Game Development", icon: <FiBriefcase /> },
    { name: "IoT (Internet of Things)", icon: <FiBriefcase /> },
    { name: "Big Data", icon: <FiBriefcase /> },
    { name: "Machine Learning", icon: <FiBriefcase /> },
    { name: "IT Project Management", icon: <FiBriefcase /> },
    { name: "IT Support and Helpdesk", icon: <FiBriefcase /> },
    { name: "Systems Administration", icon: <FiBriefcase /> },
    { name: "IT Consulting", icon: <FiBriefcase /> }
  ];

  const cities = [
    "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune",
    "Delhi", "Kolkata", "Noida", "Gurgaon", "Gurugram",
    "Ahmedabad", "Vizeg", "Lucknow", "Bhopal", "Jaipur",
    "Indore", "Kanpur", "Nagpur", "Patna", "Vadodara"
  ];

  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    dispatch(postJob(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
      navigate('/myjobs');
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="job-post-container">
      <div className="glass-card job-post-card">
        <h2 className="job-post-title">
          <FiBriefcase className="title-icon" /> Post A Job
        </h2>

        <form onSubmit={handleSubmit} className="job-post-form">
          <div className="form-row">
            <div className="input-group">
              <label><FiType className="input-icon" /> Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter job title"
                required
              />
            </div>

            <div className="input-group">
              <label><FiBriefcase className="input-icon" /> Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label><FiMapPin className="input-icon" /> Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Location</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label><FiHome className="input-icon" /> Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label><FiAward className="input-icon" /> Job Niche</label>
              <select
                name="jobNiche"
                value={formData.jobNiche}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Job Niche</option>
                {nichesArray.map(niche => (
                  <option key={niche.name} value={niche.name}>
                    {niche.icon} {niche.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label><FiDollarSign className="input-icon" /> Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., 50000 - 80000"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label><FiFileText className="input-icon" /> Job Introduction</label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="Describe the job and company"
              rows={5}
              required
            />
          </div>

          <div className="input-group">
            <label><FiList className="input-icon" /> Responsibilities</label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleInputChange}
              placeholder="List job responsibilities"
              rows={5}
              required
            />
          </div>

          <div className="input-group">
            <label><FiAward className="input-icon" /> Qualifications</label>
            <textarea
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder="List required qualifications"
              rows={5}
              required
            />
          </div>

          <div className="input-group">
            <div className="label-with-info">
              <label><FiBriefcase className="input-icon" /> What We Offer</label>
              <span className="info-tag"><CiCircleInfo /> Optional</span>
            </div>
            <textarea
              name="offers"
              value={formData.offers}
              onChange={handleInputChange}
              placeholder="Describe benefits and perks"
              rows={5}
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <div className="label-with-info">
                <label><FiUsers className="input-icon" /> Hiring Multiple?</label>
                <span className="info-tag"><CiCircleInfo /> Optional</span>
              </div>
              <select
                name="hiringMultipleCandidates"
                value={formData.hiringMultipleCandidates}
                onChange={handleInputChange}
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <div className="label-with-info">
                <label><FiGlobe className="input-icon" /> Website Title</label>
                <span className="info-tag"><CiCircleInfo /> Optional</span>
              </div>
              <input
                type="text"
                name="personalWebsiteTitle"
                value={formData.personalWebsiteTitle}
                onChange={handleInputChange}
                placeholder="Enter website name"
              />
            </div>

            <div className="input-group">
              <div className="label-with-info">
                <label><FiLink className="input-icon" /> Website URL</label>
                <span className="info-tag"><CiCircleInfo /> Optional</span>
              </div>
              <input
                type="url"
                name="personalWebsiteUrl"
                value={formData.personalWebsiteUrl}
                onChange={handleInputChange}
                placeholder="Enter website URL"
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || !formData.title || !formData.jobType || 
                     !formData.location || !formData.companyName || 
                     !formData.introduction || !formData.responsibilities || 
                     !formData.qualifications || !formData.jobNiche || 
                     !formData.salary}
          >
            {loading ? (
              <span className="button-loading">
                <span className="spinner"></span> Posting...
              </span>
            ) : (
              <>
                <FiBriefcase className="button-icon" /> Post Job
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;