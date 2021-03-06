import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import LabelIcon from 'icons/label.svg';
import TranshCanIcon from 'icons/trash-can.svg';
import PaintIcon from 'icons/paintbrush.svg';
import CheckboxIcon from 'icons/checkbox.svg';
import ArchiveIcon from 'icons/archive.svg';
import Tool from 'containers/Toolbar/Tool/Tool';
import ColorPalette from 'components/ColorPalette/ColorPalette';

const ToolbarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  line-height: 0;
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  transition: opacity 0.3s ease-out;

  @media (max-width: 1024px) {
    opacity: 1;
  }

  @media (max-width: 320px) {
    flex-direction: column;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  font-size: 1.5rem;
  padding: 8px 24px;
  border-radius: 4px;
  letter-spacing: 0.4px;

  &:hover {
    opacity: 0.87;
    background: rgba(95, 99, 104, 0.157);
  }

  @media (max-width: 320px) {
    margin-left: auto;
    padding: 0;
  }
`;

const ToolContaienr = styled.div`
  @media (max-width: 320px) {
    margin-left: auto;
  }
`;

function Toolbar({
  id,
  onHover,
  onAddNote,
  onToggle,
  onClick,
  isInputField,
  setShowLabel,
  labels,
  onDelete,
  isChecked,
  onClose,
  note,
  isArchived,
}) {
  const [isHoverColorPalette, setIsHoverColorPalette] = useState(false);
  const icons = [
    {
      icon: PaintIcon,
      title: 'Change Color',
    },
    {
      icon: LabelIcon,
      title: 'Add Label',
    },
    {
      icon: CheckboxIcon,
      title: 'Show Checkbox',
    },
    {
      icon: ArchiveIcon,
      title: isArchived ? 'Unarchive' : 'Archive',
    },
  ];

  const editableNote = useSelector((state) => state.notes.editableNote);
  const isEditable = editableNote ? true : false;

  const handleShowColorPalette = () => setIsHoverColorPalette(true);
  const handleHideColorPalette = () => setIsHoverColorPalette(false);

  return (
    <ToolbarContainer hovered={onHover}>
      <ToolContaienr>
        {icons.map((icon, i) => (
          <Tool
            key={i}
            id={id}
            title={icon.title}
            bgImage={icon.icon}
            labels={labels}
            showPalette={
              icon.title === 'Change Color' ? handleShowColorPalette : null
            }
            hidePalette={
              icon.title === 'Change Color' ? handleHideColorPalette : null
            }
            onToggle={onToggle}
            setShowLabel={setShowLabel}
            isInputField={isInputField}
            isChecked={isChecked}
            isArchived={isArchived}
            note={note}
          />
        ))}
        {!isInputField && (
          <Tool
            id={id}
            title="Delete Note"
            bgImage={TranshCanIcon}
            isArchived={isArchived}
            onDelete={onDelete}
          />
        )}
      </ToolContaienr>
      {isInputField && <CloseBtn onClick={onAddNote}>Close</CloseBtn>}
      {isEditable && <CloseBtn onClick={onClose}>Close</CloseBtn>}
      {isHoverColorPalette && (
        <ColorPalette
          id={id}
          isInputField={isInputField}
          isArchived={isArchived}
          onUnHover={handleHideColorPalette}
          onHover={handleShowColorPalette}
          onClick={onClick}
        />
      )}
    </ToolbarContainer>
  );
}

Toolbar.propTypes = {
  id: PropTypes.string,
  onHover: PropTypes.bool.isRequired,
  onAddNote: PropTypes.func,
  onToggle: PropTypes.func,
  onClick: PropTypes.func,
  isInputField: PropTypes.bool,
  isArchived: PropTypes.bool,
  setShowLabel: PropTypes.func,
  labels: PropTypes.array,
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default React.memo(Toolbar);
