// client/src/components/settings/ThemeSettings.jsx
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Palette, Type, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme, setPrimaryColor, setSecondaryColor, setFontFamily } from '../../store/slices/settingsSlice';

const ThemeSettings = () => {
  const dispatch = useDispatch();
  const { theme: currentTheme, primaryColor, secondaryColor, fontFamily } = useSelector(state => state.settings);
  
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [selectedPrimary, setSelectedPrimary] = useState(primaryColor);
  const [selectedSecondary, setSelectedSecondary] = useState(secondaryColor);
  const [selectedFont, setSelectedFont] = useState(fontFamily);
  
  const themes = [
    { id: 'light', name: 'Light', icon: Sun, color: 'bg-white', textColor: 'text-gray-900' },
    { id: 'dark', name: 'Dark', icon: Moon, color: 'bg-gray-900', textColor: 'text-white' },
    { id: 'system', name: 'System', icon: Monitor, color: 'bg-gray-500', textColor: 'text-white' }
  ];
  
  const primaryColors = [
    { name: 'Purple', value: '#8B5CF6', class: 'bg-purple-500' },
    { name: 'Blue', value: '#3B82F6', class: 'bg-blue-500' },
    { name: 'Green', value: '#10B981', class: 'bg-green-500' },
    { name: 'Red', value: '#EF4444', class: 'bg-red-500' },
    { name: 'Orange', value: '#F59E0B', class: 'bg-orange-500' },
    { name: 'Pink', value: '#EC4899', class: 'bg-pink-500' },
    { name: 'Indigo', value: '#6366F1', class: 'bg-indigo-500' },
    { name: 'Teal', value: '#14B8A6', class: 'bg-teal-500' }
  ];
  
  const secondaryColors = [
    { name: 'Amber', value: '#F59E0B', class: 'bg-amber-500' },
    { name: 'Rose', value: '#F43F5E', class: 'bg-rose-500' },
    { name: 'Cyan', value: '#06B6D4', class: 'bg-cyan-500' },
    { name: 'Emerald', value: '#10B981', class: 'bg-emerald-500' },
    { name: 'Violet', value: '#8B5CF6', class: 'bg-violet-500' },
    { name: 'Sky', value: '#0EA5E9', class: 'bg-sky-500' }
  ];
  
  const fonts = [
    { name: 'Default', value: 'Inter, system-ui, sans-serif' },
    { name: 'Noto Naskh Arabic', value: "'Noto Naskh Arabic', serif" },
    { name: 'Amiri', value: "'Amiri', serif" },
    { name: 'Poppins', value: "'Poppins', sans-serif" },
    { name: 'Merriweather', value: "'Merriweather', serif" },
    { name: 'Open Sans', value: "'Open Sans', sans-serif" }
  ];

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    dispatch(setTheme(themeId));
    document.documentElement.setAttribute('data-theme', themeId);
    if (themeId === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (themeId === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (themeId === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handlePrimaryColorChange = (color) => {
    setSelectedPrimary(color);
    dispatch(setPrimaryColor(color));
    document.documentElement.style.setProperty('--color-primary-600', color);
  };

  const handleSecondaryColorChange = (color) => {
    setSelectedSecondary(color);
    dispatch(setSecondaryColor(color));
    document.documentElement.style.setProperty('--color-secondary-500', color);
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    dispatch(setFontFamily(font));
    document.documentElement.style.setProperty('--font-family', font);
  };

  // Load saved settings on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedPrimary = localStorage.getItem('primaryColor');
    const savedSecondary = localStorage.getItem('secondaryColor');
    const savedFont = localStorage.getItem('fontFamily');
    
    if (savedTheme) handleThemeChange(savedTheme);
    if (savedPrimary) handlePrimaryColorChange(savedPrimary);
    if (savedSecondary) handleSecondaryColorChange(savedSecondary);
    if (savedFont) handleFontChange(savedFont);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (selectedTheme === 'system') {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  return (
    <div className="space-y-6">
      {/* Theme Mode */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Mode</h3>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTheme === theme.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 ${theme.color} rounded-lg mx-auto mb-2 flex items-center justify-center shadow-sm`}>
                <theme.icon className={`h-6 w-6 ${theme.id === 'light' ? 'text-gray-900' : 'text-white'}`} />
              </div>
              <p className="text-sm font-medium text-gray-700">{theme.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Color */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Color</h3>
        <div className="flex flex-wrap gap-3">
          {primaryColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handlePrimaryColorChange(color.value)}
              className={`w-10 h-10 rounded-full ${color.class} transition-all ${
                selectedPrimary === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              title={color.name}
            />
          ))}
          <div className="flex items-center gap-2 ml-2">
            <input
              type="color"
              value={selectedPrimary}
              onChange={(e) => handlePrimaryColorChange(e.target.value)}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            />
            <span className="text-xs text-gray-500">Custom</span>
          </div>
        </div>
      </div>

      {/* Secondary Color */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Secondary Color</h3>
        <div className="flex flex-wrap gap-3">
          {secondaryColors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleSecondaryColorChange(color.value)}
              className={`w-10 h-10 rounded-full ${color.class} transition-all ${
                selectedSecondary === color.value ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
              }`}
              title={color.name}
            />
          ))}
          <div className="flex items-center gap-2 ml-2">
            <input
              type="color"
              value={selectedSecondary}
              onChange={(e) => handleSecondaryColorChange(e.target.value)}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
            />
            <span className="text-xs text-gray-500">Custom</span>
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Family</h3>
        <div className="grid grid-cols-2 gap-3">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => handleFontChange(font.value)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                selectedFont === font.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ fontFamily: font.value }}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{font.name}</span>
                {selectedFont === font.value && <Check className="h-4 w-4 text-primary-600" />}
              </div>
              <p className="text-sm text-gray-500 mt-1">The quick brown fox jumps over the lazy dog</p>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Live Preview</h3>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500 mb-2">Preview with current settings</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: selectedPrimary }}>
              Primary Button
            </button>
            <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: selectedSecondary }}>
              Secondary Button
            </button>
          </div>
          <div className="mt-3 p-3 rounded-lg border" style={{ borderColor: selectedPrimary }}>
            <p style={{ fontFamily: selectedFont }} className="text-gray-700">
              Sample text with selected font family. This is how your poems will look.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;