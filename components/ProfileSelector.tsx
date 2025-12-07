import React from 'react';
import { AllergyType, UserProfile } from '../types';

interface ProfileSelectorProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ALLERGY_OPTIONS: AllergyType[] = [
  'Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Gluten/Wheat', 
  'Soy', 'Fish', 'Shellfish', 'Vegan', 'Vegetarian', 'Halal'
];

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ profile, setProfile }) => {
  const toggleAllergy = (allergy: AllergyType) => {
    setProfile(prev => {
      const exists = prev.allergies.includes(allergy);
      return {
        ...prev,
        allergies: exists 
          ? prev.allergies.filter(a => a !== allergy)
          : [...prev.allergies, allergy]
      };
    });
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, customRestrictions: e.target.value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Your Dietary Profile
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-600 mb-2">Select Restrictions:</label>
        <div className="flex flex-wrap gap-2">
          {ALLERGY_OPTIONS.map(allergy => (
            <button
              key={allergy}
              onClick={() => toggleAllergy(allergy)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                profile.allergies.includes(allergy)
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {allergy}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Other Restrictions (Optional):</label>
        <input
          type="text"
          value={profile.customRestrictions}
          onChange={handleCustomChange}
          placeholder="e.g. Strawberries, Red Dye 40"
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>
    </div>
  );
};
