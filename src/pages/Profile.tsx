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

import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
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
    if (newSkill && !tempProfile.technicalSkills.includes(newSkill)) {
      setTempProfile({
        ...tempProfile,
        technicalSkills: [...tempProfile.technicalSkills, newSkill]
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
    downloadAnchorNode.setAttribute("download", `${profile.fullName.replace(/\s+/g, '_')}_Profile.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Profile Header Card */}
      <div className={cn(
        "rounded-3xl border transition-all overflow-hidden relative",
        isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
      )}>
        <div className="px-10 py-10">
          <div className="relative flex flex-col md:flex-row md:items-center gap-10">
            <div className="relative group">
              <div className={cn(
                "w-36 h-36 rounded-3xl p-1 shadow-xl relative overflow-hidden border",
                isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-white"
              )}>
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.fullName}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold tracking-tighter">{profile.fullName}</h1>
                <span className={cn(
                  "px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border",
                  isDark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                )}>
                  Active Employee
                </span>
              </div>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg flex items-center gap-2">
                <Briefcase size={20} />
                {profile.designation}
              </p>
              <p className={cn("text-sm font-semibold flex items-center gap-2", isDark ? "text-slate-400" : "text-slate-500")}>
                <MapPin size={18} />
                {profile.currentAddress}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {!isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all border",
                      isDark ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700" : "bg-slate-50 text-slate-900 border-slate-100 hover:bg-slate-100"
                    )}
                  >
                    <Edit3 size={20} />
                    <span>Edit Profile</span>
                  </button>
                  <button 
                    onClick={handleDownloadCV}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    <Download size={20} />
                    <span>Export Profile</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleCancel}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all",
                      isDark ? "bg-slate-800 text-slate-400 hover:bg-slate-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    <Save size={20} />
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
          <div className={cn(
            "p-10 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <User size={22} />
              </div>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <InfoItem 
                label="Full Name" 
                value={isEditing ? tempProfile.fullName : profile.fullName} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, fullName: v})}
              />
              <InfoItem 
                label="Designation" 
                value={isEditing ? tempProfile.designation : profile.designation} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, designation: v})}
              />
              <InfoItem 
                label="Join Date" 
                value={isEditing ? tempProfile.joinDate : profile.joinDate} 
                isEditing={isEditing}
                isDark={isDark}
                type="date"
                onChange={(v) => setTempProfile({...tempProfile, joinDate: v})}
              />
              <InfoItem 
                label="Date of Birth" 
                value={isEditing ? tempProfile.dateOfBirth : profile.dateOfBirth} 
                isEditing={isEditing}
                isDark={isDark}
                type="date"
                onChange={(v) => setTempProfile({...tempProfile, dateOfBirth: v})}
              />
              <InfoItem 
                label="NIC Number" 
                value={isEditing ? tempProfile.nicNumber : profile.nicNumber} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, nicNumber: v})}
              />
              <InfoItem 
                label="Contact Number" 
                value={isEditing ? tempProfile.contactNumber : profile.contactNumber} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, contactNumber: v})}
              />
              <InfoItem 
                label="Personal Email" 
                value={isEditing ? tempProfile.personalEmail : profile.personalEmail} 
                isEditing={isEditing}
                isDark={isDark}
                type="email"
                onChange={(v) => setTempProfile({...tempProfile, personalEmail: v})}
              />
              <InfoItem 
                label="Salary" 
                value={isEditing ? tempProfile.salary : profile.salary} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, salary: v})}
              />
            </div>
          </div>

          {/* Addresses */}
          <div className={cn(
            "p-10 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <MapPin size={22} />
              </div>
              Address Details
            </h3>
            <div className="space-y-8">
              <InfoItem 
                label="Current Address" 
                value={isEditing ? tempProfile.currentAddress : profile.currentAddress} 
                isEditing={isEditing}
                isDark={isDark}
                fullWidth 
                onChange={(v) => setTempProfile({...tempProfile, currentAddress: v})}
              />
              <InfoItem 
                label="Permanent Address" 
                value={isEditing ? tempProfile.permanentAddress : profile.permanentAddress} 
                isEditing={isEditing}
                isDark={isDark}
                fullWidth 
                onChange={(v) => setTempProfile({...tempProfile, permanentAddress: v})}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className={cn(
            "p-10 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Award size={22} />
              </div>
              Bank & Assets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <InfoItem 
                label="Bank Name" 
                value={isEditing ? tempProfile.bankName : profile.bankName} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, bankName: v})}
              />
              <InfoItem 
                label="IBAN Number" 
                value={isEditing ? tempProfile.ibanNumber : profile.ibanNumber} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, ibanNumber: v})}
              />
              <InfoItem 
                label="Vehicle Number" 
                value={isEditing ? tempProfile.vehicleNumber : profile.vehicleNumber} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, vehicleNumber: v})}
              />
            </div>
          </div>

          {/* NIC Documents */}
          <div className={cn(
            "p-10 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <ShieldCheck size={22} />
              </div>
              NIC Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] ml-1">NIC Front</p>
                <div className={cn(
                  "aspect-[1.6/1] rounded-2xl overflow-hidden border shadow-sm relative group",
                  isDark ? "border-slate-800" : "border-slate-100"
                )}>
                  <img src={profile.nicFront} alt="NIC Front" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera className="text-white" size={32} />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] ml-1">NIC Back</p>
                <div className={cn(
                  "aspect-[1.6/1] rounded-2xl overflow-hidden border shadow-sm relative group",
                  isDark ? "border-slate-800" : "border-slate-100"
                )}>
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
          <div className={cn(
            "p-8 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Zap size={22} />
              </div>
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {(isEditing ? tempProfile.technicalSkills : profile.technicalSkills).map((skill) => (
                <span key={skill} className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2",
                  isDark ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-indigo-50 text-indigo-700 border-indigo-100"
                )}>
                  {skill}
                  {isEditing && (
                    <button onClick={() => removeSkill(skill)} className="hover:text-rose-600 transition-colors">
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
                  className={cn(
                    "flex-1 px-4 py-3 border rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all",
                    isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-slate-50 border-slate-100 focus:border-indigo-300"
                  )}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button 
                  onClick={addSkill}
                  className="p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  <Plus size={22} />
                </button>
              </div>
            )}
          </div>

          {/* Social Profiles */}
          <div className={cn(
            "p-8 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Globe size={22} />
              </div>
              Social Profiles
            </h3>
            <div className="space-y-4">
              <SocialLink 
                icon={Linkedin} 
                label="LinkedIn" 
                url={isEditing ? tempProfile.linkedinProfile : profile.linkedinProfile} 
                color="#0077b5" 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, linkedinProfile: v})}
              />
              <SocialLink 
                icon={Github} 
                label="GitHub" 
                url={isEditing ? tempProfile.githubProfile : profile.githubProfile} 
                color={isDark ? "#f8fafc" : "#181717"} 
                isEditing={isEditing}
                isDark={isDark}
                onChange={(v) => setTempProfile({...tempProfile, githubProfile: v})}
              />
              {(isEditing ? tempProfile.socialProfiles : profile.socialProfiles).map((social, idx) => (
                <div key={idx} className="relative group">
                  <SocialLink 
                    icon={Globe} 
                    label={social.platform} 
                    url={social.url} 
                    color={isDark ? "#94a3b8" : "#64748b"} 
                    isEditing={isEditing}
                    isDark={isDark}
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
                  className={cn(
                    "w-full py-4 border-2 border-dashed rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                    isDark ? "border-slate-800 text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400" : "border-slate-100 text-slate-400 hover:border-indigo-300 hover:text-indigo-600"
                  )}
                >
                  <Plus size={18} />
                  <span>Add Social Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className={cn(
            "p-8 rounded-3xl border transition-all",
            isDark ? "bg-dark-card border-slate-800" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h3 className="text-display-sm font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                <Mail size={22} />
              </div>
              Contact Info
            </h3>
            <div className="space-y-4">
              {(isEditing ? tempProfile.contactInformation : profile.contactInformation).map((info, idx) => (
                <div key={idx} className="relative group">
                  <div className={cn(
                    "p-5 rounded-2xl border transition-all",
                    isDark ? "bg-slate-800/50 border-slate-800" : "bg-slate-50 border-slate-100"
                  )}>
                    {isEditing ? (
                      <div className="space-y-3">
                        <input 
                          type="text"
                          value={info.type}
                          onChange={(e) => {
                            const newInfo = [...tempProfile.contactInformation];
                            newInfo[idx] = { ...newInfo[idx], type: e.target.value };
                            setTempProfile({ ...tempProfile, contactInformation: newInfo });
                          }}
                          className="w-full bg-transparent border-b border-indigo-500/20 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest outline-none focus:border-indigo-500 transition-colors"
                        />
                        <input 
                          type="text"
                          value={info.value}
                          onChange={(e) => {
                            const newInfo = [...tempProfile.contactInformation];
                            newInfo[idx] = { ...newInfo[idx], value: e.target.value };
                            setTempProfile({ ...tempProfile, contactInformation: newInfo });
                          }}
                          className="w-full bg-transparent text-sm font-bold outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] mb-1.5">{info.type}</p>
                        <p className="text-sm font-bold">{info.value}</p>
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
                  className={cn(
                    "w-full py-4 border-2 border-dashed rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                    isDark ? "border-slate-800 text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400" : "border-slate-100 text-slate-400 hover:border-indigo-300 hover:text-indigo-600"
                  )}
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
  isDark = false,
  onChange, 
  type = "text" 
}: { 
  label: string; 
  value: string; 
  fullWidth?: boolean; 
  isEditing?: boolean; 
  isDark?: boolean;
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <div className={cn("space-y-2.5", fullWidth ? "w-full" : "")}>
      <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] ml-1">{label}</p>
      {isEditing ? (
        <input 
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "w-full px-5 py-3.5 border rounded-2xl outline-none transition-all text-sm font-bold focus:ring-4 focus:ring-indigo-500/10",
            isDark ? "bg-slate-800/50 border-slate-700 text-white focus:border-indigo-500" : "bg-white border-indigo-100 focus:border-indigo-300"
          )}
        />
      ) : (
        <p className={cn(
          "text-sm font-bold px-5 py-3.5 rounded-2xl border transition-all",
          isDark ? "bg-slate-800/30 border-slate-800 text-slate-200" : "bg-slate-50/50 border-slate-100 text-slate-900"
        )}>
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
  isDark = false,
  onChange 
}: { 
  icon: any; 
  label: string; 
  url: string; 
  color: string; 
  isEditing?: boolean;
  isDark?: boolean;
  onChange?: (v: string) => void;
}) {
  if (isEditing) {
    return (
      <div className="space-y-2">
        <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] ml-1">{label} URL</p>
        <div className={cn(
          "flex items-center gap-4 p-3.5 border rounded-2xl transition-all focus-within:ring-4 focus-within:ring-indigo-500/10",
          isDark ? "bg-slate-800/50 border-slate-700 focus-within:border-indigo-500" : "bg-white border-indigo-100 focus-within:border-indigo-300"
        )}>
          <Icon size={20} style={{ color }} />
          <input 
            type="text"
            value={url}
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm font-bold"
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
      className={cn(
        "flex items-center justify-between p-5 rounded-2xl transition-all group border",
        isDark ? "bg-slate-800/30 border-slate-800 hover:bg-slate-800/50" : "bg-slate-50/50 border-slate-100 hover:bg-slate-100"
      )}
    >
      <div className="flex items-center gap-4">
        <Icon size={22} style={{ color }} />
        <span className="text-sm font-bold opacity-80">{label}</span>
      </div>
      <ChevronRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </a>
  );
}
