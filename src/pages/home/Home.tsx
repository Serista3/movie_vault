import MediaSlider from "../../components/media/MediaSlider";
import MediaSection from "../../components/media//MediaSection";
import LazyMediaRow from "../../components/media/LazyMediaRow";
import ToggleSwitch from "../../components/ToggleSwitch";

import { useReducer } from "react";
import { selectModeReducer, defaultSections } from "./reducer";

export default function Home() {
  const [sections, dispatchSection] = useReducer(selectModeReducer, defaultSections);

  const handleToggleChange = function(title: string, mode: string) {
    dispatchSection({ type: 'CHANGE_MODE', title, mode });
  }

  return (
    <div className="home flex flex-col gap-10 pb-8">
      <MediaSlider />
      <div className="media-sections flex flex-col items-center gap-15 mb-20">
        {sections.map((section) => {
          return (
            <MediaSection key={section.title} title={section.title} className="max-w-300">
              <ToggleSwitch 
                title={section.title}
                modes={section.modes} 
                onChange={handleToggleChange} 
                activeMode={section.curMode} 
              />
              {section.title === 'Trending' ? (
                <LazyMediaRow
                  key={`${section.title}-${section.curMode}`}
                  fetchFunction={section.fetchFunction} 
                  fetchArgs={section.fetchArgs} 
                />
              ) : (
                <LazyMediaRow
                  key={`${section.title}-${section.curMode}`}
                  fetchFunction={section.fetchFunction} 
                  fetchArgs={section.fetchArgs} 
                />
              )}
            </MediaSection>
          )
        })}
      </div>
    </div>
  );
}
