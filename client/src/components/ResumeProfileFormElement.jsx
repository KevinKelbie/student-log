import React, { useState } from 'react';

import { faEllipsisV, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { rgba } from 'polished';
import styled from 'styled-components';

import Button, { Button2 } from './Button';
import EditDropdown from './EditDropdown';
import Input from './Input';
import Label from './common/Label';

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}

function FormElement({ handle, content, register, editable, errors, ...props }) {
  const [isEditable, setIsEditable] = useState(editable);
  const [editDropdownActive, setEditDropdownActive] = useState(false);

  return (
    <div {...props}>
      <div className="content">
        <div className={`form ${!isEditable ? 'hidden' : ''}`}>
          <Label>Full Name</Label>
          <Input type="text" name={`profile.name`} ref={register} placeholder="John Smith" />

          <Label>Email</Label>
          <Input
            type="text"
            name={`profile.email`}
            ref={register}
            placeholder="johnsmith@gmail.com"
          />

          <Label>Phone Number</Label>
          <Input type="text" name={`profile.number`} ref={register} placeholder="(555) 123-4567" />

          <Label>Location</Label>
          <Input type="text" name={`profile.location`} ref={register} placeholder="New York, NY" />

          <Label>Link</Label>
          <Input
            type="text"
            name={`profile.link`}
            ref={register}
            placeholder="mycoolportfolio.com/myname"
          />

          <div type="submit" className="buttons">
            <Button
              icon={faSave}
              variant={'fill'}
              onClick={async () => {
                const errors = await props.triggerValidation();
              }}
            >
              Save
            </Button>
          </div>
        </div>
        <div className={`render ${isEditable ? 'hidden' : ''}`}>
          <div className="top">
            <div className="left">
              <div className="name">{props.watch(`name[${props.index}]`)}</div>
              <div className="course">
                <span className="major">{props.watch(`awarder[${props.index}]`)}</span>
                <span className="degree">{props.watch(`degree[${props.index}]`)}</span>
              </div>
            </div>
            <div className="right">
              <div className="location">{props.watch(`location[${props.index}]`)}</div>
              <div className="start-end">{props.watch(`date[${props.index}]`)}</div>
            </div>
          </div>
          <div className="bottom">{props.watch(`summary[${props.index}]`)}</div>
        </div>
      </div>
      {!isEditable ? (
        <div
          className="edit"
          onClick={() => {
            setEditDropdownActive(!editDropdownActive);
          }}
        >
          <FontAwesomeIcon icon={faEllipsisV} />
          {editDropdownActive ? <EditDropdown setIsEditable={setIsEditable}></EditDropdown> : null}
        </div>
      ) : null}
    </div>
  );
}

export default styled(FormElement)`
  display: flex;
  align-items: center;

  .handle {
    color: ${props => props.theme.PRIMARY_COLOR};
    visibility: ${props => (props.handle ? 'visible' : 'hidden')};
    margin-right: 8px;
  }

  .content {
    padding: 8px;
    flex-grow: 1;

    .form {
      &.hidden {
        display: none;
      }

      .buttons {
        display: flex;
        margin-top: 8px;

        ${Button2}:first-child {
          margin-left: 0px;
        }

        ${Button2} {
          margin-left: 4px;
        }
      }
    }

    .render {
      .top {
        justify-content: space-between;
        align-items: center;

        display: flex;
      }

      &.hidden {
        display: none;
      }

      .name {
        font-size: 20px;
        font-weight: bold;
      }

      .left {
        text-align: left;
      }

      .right {
        text-align: right;
      }
    }
  }

  .edit {
    color: ${props => props.theme.PRIMARY_COLOR};
    margin-left: 8px;
    cursor: pointer;
  }
`;
