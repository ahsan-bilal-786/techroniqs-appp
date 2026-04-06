import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Github, 
  Linkedin, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Download, 
  Edit3, 
  Save, 
  X,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Camera,
  Zap,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ProfileData {
  fullName: string;
  designation: string;
  joinDate: string;
  nicNumber: string;
  contactNumber: string;
  permanentAddress: string;
  currentAddress: string;
  nicFront: string;
  nicBack: string;
  personalEmail: string;
  linkedinProfile: string;
  githubProfile: string;
  bankName: string;
  vehicleNumber: string;
  ibanNumber: string;
  dateOfBirth: string;
  salary: string;
  technicalSkills: string[];
  socialProfiles: { platform: string; url: string }[];
  contactInformation: { type: string; value: string }[];
}

const initialProfile: ProfileData = {
  fullName: 'Ahsan Bilal',
  designation: 'Senior Full Stack Developer',
  joinDate: '2022-01-15',
  nicNumber: '35202-1234567-1',
  contactNumber: '+92 300 1234567',
  permanentAddress: 'House #123, Street #4, Model Town, Lahore',
  currentAddress: 'Apartment #5B, Gulberg Heights, Lahore',
  nicFront: 'https://picsum.photos/seed/nicfront/400/250',
  nicBack: 'https://picsum.photos/seed/nicback/400/250',
  personalEmail: 'engr.ahsan.bilal@gmail.com',
  linkedinProfile: 'https://linkedin.com/in/ahsanbilal',
  githubProfile: 'https://github.com/ahsanbilal',
  bankName: 'Habib Bank Limited (HBL)',
  vehicleNumber: 'LEC-1234',
  ibanNumber: 'PK70HABB0012345678901234',
  dateOfBirth: '1995-05-20',
  salary: 'PKR 250,000',
  technicalSkills: ['React', 'TypeScript', 'Node.js', 'Flutter', 'Firebase', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  socialProfiles: [
    { platform: 'Twitter', url: 'https://twitter.com/ahsanbilal' },
    { platform: 'StackOverflow', url: 'https://stackoverflow.com/users/ahsanbilal' }
  ],
  contactInformation: [
    { type: 'Emergency Contact', value: '+92 321 7654321' },
    { type: 'Skype', value: 'ahsan.bilal.dev' }
  ]
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [tempProfile, setTempProfile] = useState<ProfileData>(initialProfile);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !tempProfile.technicalSkills.includes(newSkill.trim())) {
      setTempProfile({
        ...tempProfile,
        technicalSkills: [...tempProfile.technicalSkills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setTempProfile({
      ...tempProfile,
      technicalSkills: tempProfile.technicalSkills.filter(s => s !== skillToRemove)
    });
  };

  const handleDownloadCV = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${profile.fullName.replace(' ', '_')}_Profile.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="px-8 py-8">
          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-slate-50 p-1 shadow-md relative overflow-hidden border border-slate-100">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">{profile.fullName}</h1>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-100">
                  Active Employee
                </span>
              </div>
              <p className="text-indigo-600 font-bold flex items-center gap-2">
                <Briefcase size={16} />
                {profile.designation}
              </p>
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <MapPin size={16} />
                {profile.currentAddress}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all border border-slate-200"
                  >
                    <Edit3 size={18} />
                    <span>Edit Profile</span>
                  </button>
                  <button 
                    onClick={handleDownloadCV}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
                  >
                    <Download size={18} />
                    <span>Export Profile</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-all"
                  >
                    <X size={18} />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal & Professional Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-indigo-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoItem 
                label="Full Name" 
                value={isEditing ? tempProfile.fullName : profile.fullName} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, fullName: v})}
              />
              <InfoItem 
                label="Designation" 
                value={isEditing ? tempProfile.designation : profile.designation} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, designation: v})}
              />
              <InfoItem 
                label="Join Date" 
                value={isEditing ? tempProfile.joinDate : profile.joinDate} 
                isEditing={isEditing}
                type="date"
                onChange={(v) => setTempProfile({...tempProfile, joinDate: v})}
              />
              <InfoItem 
                label="Date of Birth" 
                value={isEditing ? tempProfile.dateOfBirth : profile.dateOfBirth} 
                isEditing={isEditing}
                type="date"
                onChange={(v) => setTempProfile({...tempProfile, dateOfBirth: v})}
              />
              <InfoItem 
                label="NIC Number" 
                value={isEditing ? tempProfile.nicNumber : profile.nicNumber} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, nicNumber: v})}
              />
              <InfoItem 
                label="Contact Number" 
                value={isEditing ? tempProfile.contactNumber : profile.contactNumber} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, contactNumber: v})}
              />
              <InfoItem 
                label="Personal Email" 
                value={isEditing ? tempProfile.personalEmail : profile.personalEmail} 
                isEditing={isEditing}
                type="email"
                onChange={(v) => setTempProfile({...tempProfile, personalEmail: v})}
              />
              <InfoItem 
                label="Salary" 
                value={isEditing ? tempProfile.salary : profile.salary} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, salary: v})}
              />
            </div>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" />
              Address Details
            </h3>
            <div className="space-y-6">
              <InfoItem 
                label="Current Address" 
                value={isEditing ? tempProfile.currentAddress : profile.currentAddress} 
                isEditing={isEditing}
                fullWidth 
                onChange={(v) => setTempProfile({...tempProfile, currentAddress: v})}
              />
              <InfoItem 
                label="Permanent Address" 
                value={isEditing ? tempProfile.permanentAddress : profile.permanentAddress} 
                isEditing={isEditing}
                fullWidth 
                onChange={(v) => setTempProfile({...tempProfile, permanentAddress: v})}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award size={20} className="text-indigo-600" />
              Bank & Assets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InfoItem 
                label="Bank Name" 
                value={isEditing ? tempProfile.bankName : profile.bankName} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, bankName: v})}
              />
              <InfoItem 
                label="IBAN Number" 
                value={isEditing ? tempProfile.ibanNumber : profile.ibanNumber} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, ibanNumber: v})}
              />
              <InfoItem 
                label="Vehicle Number" 
                value={isEditing ? tempProfile.vehicleNumber : profile.vehicleNumber} 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, vehicleNumber: v})}
              />
            </div>
          </div>

          {/* NIC Documents */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ShieldCheck size={20} className="text-indigo-600" />
              NIC Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">NIC Front</p>
                <div className="aspect-[1.6/1] rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                  <img src={profile.nicFront} alt="NIC Front" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="text-white" size={32} />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">NIC Back</p>
                <div className="aspect-[1.6/1] rounded-2xl overflow-hidden border border-slate-100 shadow-sm relative group">
                  <img src={profile.nicBack} alt="NIC Back" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="text-white" size={32} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Socials */}
        <div className="space-y-8">
          {/* Technical Skills */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Zap size={20} className="text-indigo-600" />
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(isEditing ? tempProfile.technicalSkills : profile.technicalSkills).map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100 flex items-center gap-2">
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="hover:text-rose-600">
                      <X size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add skill..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-300"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button 
                  onClick={addSkill}
                  className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Social Profiles */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Globe size={20} className="text-indigo-600" />
              Social Profiles
            </h3>
            <div className="space-y-4">
              <SocialLink 
                icon={Linkedin} 
                label="LinkedIn" 
                url={isEditing ? tempProfile.linkedinProfile : profile.linkedinProfile} 
                color="#0077b5" 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, linkedinProfile: v})}
              />
              <SocialLink 
                icon={Github} 
                label="GitHub" 
                url={isEditing ? tempProfile.githubProfile : profile.githubProfile} 
                color="#181717" 
                isEditing={isEditing}
                onChange={(v) => setTempProfile({...tempProfile, githubProfile: v})}
              />
              {(isEditing ? tempProfile.socialProfiles : profile.socialProfiles).map((social, idx) => (
                <div key={idx} className="relative group">
                  <SocialLink 
                    icon={Globe} 
                    label={social.platform} 
                    url={social.url} 
                    color="#64748b" 
                    isEditing={isEditing}
                    onChange={(v) => {
                      const newSocials = [...tempProfile.socialProfiles];
                      newSocials[idx] = { ...newSocials[idx], url: v };
                      setTempProfile({ ...tempProfile, socialProfiles: newSocials });
                    }}
                  />
                  {isEditing && (
                    <button 
                      onClick={() => {
                        const newSocials = tempProfile.socialProfiles.filter((_, i) => i !== idx);
                        setTempProfile({ ...tempProfile, socialProfiles: newSocials });
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button 
                  onClick={() => setTempProfile({
                    ...tempProfile,
                    socialProfiles: [...tempProfile.socialProfiles, { platform: 'Other', url: '' }]
                  })}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  <span>Add Social Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Mail size={20} className="text-indigo-600" />
              Contact Info
            </h3>
            <div className="space-y-4">
              {(isEditing ? tempProfile.contactInformation : profile.contactInformation).map((info, idx) => (
                <div key={idx} className="relative group">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input 
                          type="text"
                          value={info.type}
                          onChange={(e) => {
                            const newInfo = [...tempProfile.contactInformation];
                            newInfo[idx] = { ...newInfo[idx], type: e.target.value };
                            setTempProfile({ ...tempProfile, contactInformation: newInfo });
                          }}
                          className="w-full bg-transparent border-b border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest outline-none"
                        />
                        <input 
                          type="text"
                          value={info.value}
                          onChange={(e) => {
                            const newInfo = [...tempProfile.contactInformation];
                            newInfo[idx] = { ...newInfo[idx], value: e.target.value };
                            setTempProfile({ ...tempProfile, contactInformation: newInfo });
                          }}
                          className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{info.type}</p>
                        <p className="text-sm font-bold text-slate-700">{info.value}</p>
                      </>
                    )}
                  </div>
                  {isEditing && (
                    <button 
                      onClick={() => {
                        const newInfo = tempProfile.contactInformation.filter((_, i) => i !== idx);
                        setTempProfile({ ...tempProfile, contactInformation: newInfo });
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button 
                  onClick={() => setTempProfile({
                    ...tempProfile,
                    contactInformation: [...tempProfile.contactInformation, { type: 'Label', value: '' }]
                  })}
                  className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  <span>Add Contact Info</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ 
  label, 
  value, 
  fullWidth = false, 
  isEditing = false, 
  onChange, 
  type = "text" 
}: { 
  label: string; 
  value: string; 
  fullWidth?: boolean; 
  isEditing?: boolean; 
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <div className={cn("space-y-1", fullWidth ? "w-full" : "")}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</p>
      {isEditing ? (
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium"
        />
      ) : (
        <p className="text-sm font-bold text-slate-900 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
          {value || 'Not Provided'}
        </p>
      )}
    </div>
  );
}

function SocialLink({ 
  icon: Icon, 
  label, 
  url, 
  color, 
  isEditing = false, 
  onChange 
}: { 
  icon: any; 
  label: string; 
  url: string; 
  color: string; 
  isEditing?: boolean;
  onChange?: (v: string) => void;
}) {
  if (isEditing) {
    return (
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label} URL</p>
        <div className="flex items-center gap-3 p-2.5 bg-white border border-indigo-200 rounded-xl">
          <Icon size={18} style={{ color }} />
          <input 
            type="text"
            value={url}
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-medium"
            placeholder={`https://${label.toLowerCase()}.com/...`}
          />
        </div>
      </div>
    );
  }

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all group"
    >
      <div className="flex items-center gap-3">
        <Icon size={20} style={{ color }} />
        <span className="text-sm font-bold text-slate-700">{label}</span>
      </div>
      <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
    </a>
  );
}
