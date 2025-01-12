import React, { useState } from 'react';
import { TbHanger, TbRulerMeasure } from 'react-icons/tb';
import { BsFillCameraFill } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import { AnimatePresence } from 'framer-motion';
import NavItem from './NavItem';
import ComingSoonModal from './ComingSoonModal';

const navItems = [
  { icon: <TbHanger size={26} />, label: 'Pairing' },
  { icon: <BsFillCameraFill size={24} />, label: 'Face Shape' },
  { icon: <TbRulerMeasure size={26} />, label: 'Fit Check' },
  { icon: <RiUserSettingsLine size={26} />, label: 'Style Analysis' }
];

export default function Navigation() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="relative">
      <div className="flex justify-between px-8 py-5">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            icon={item.icon}
            label={item.label}
            index={index}
            onClick={() => setSelectedFeature(selectedFeature === item.label ? null : item.label)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <ComingSoonModal
            feature={selectedFeature}
            onDismiss={() => setSelectedFeature(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}