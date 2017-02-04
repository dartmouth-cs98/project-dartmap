// event_list_item.js
import React from 'react';
import {
  FBComments,
  FBCommentsCount,
  FBEmbedPost,
  FBEmbedVideo,
  FBFollow,
  FBLike,
  FBPage,
  FBSend,
  FBShare,
} from 'facebook-plugins';

const EventListItem = (props) => {
  if (!props.selectedLocation || props.selectedLocation === props.event.location) {
    return (
      <div>
        <div>
          <div>
            <FBLike appId="momoney6801"
              href="http://facebook.com"
              action="like"
              layout="button_count"
              share={false}
              showFaces={false}
            />
          </div>
          <div>
            <FBSend appId="momoney6801"
              href="http://facebook.com"
            />
          </div>
          <div>
            <FBShare appId="momoney6801"
              href="http://facebook.com"
              layout="box_count"
            />
          </div>
          <div>
            <FBEmbedPost appId="momoney6801"
              href="https://www.facebook.com/20531316728/posts/10154009990506729/"
              width={750}
            />
          </div>
          <div>
            <FBEmbedVideo appId="momoney6801"
              href="https://www.facebook.com/facebook/videos/10153231379946729/"
              width={750}
            />
          </div>
          <div>
            <FBComments appId="momoney6801"
              href="http://developers.facebook.com/docs/plugins/comments/"
              width={750}
              numPosts={5}
            />
          </div>
          <div>
            <FBCommentsCount appId="momoney6801"
              href="http://developers.facebook.com/docs/plugins/comments/"
              width={750}
              numPosts={5}
            />
          </div>
          <div>
            <FBPage appId="momoney6801"
              href="https://www.facebook.com/facebook"
              tabs={['timeline', 'events', 'messages']}
            />
          </div>
          <div>
            <FBFollow appId="momoney6801"
              href="https://www.facebook.com/zuck"
              tabs={['timeline', 'events', 'messages']}
            />
          </div>
        </div>
        <div className="event-item"
          onMouseOver={() => props.showBalloon(props.event.id)}
          onMouseOut={() => props.showBalloon(null)}
          onClick={() => props.onEventListItemClick(props.event.id, [props.event.lat, props.event.lng])}
        >
          <h6 className="name">
            {props.event.name}
          </h6>
          <text className="attribute">
            {props.event.start_time.format('h:mm A')} ~ {props.event.end_time.format('h:mm A')}<br />
            {props.event.location_name}
          </text>
        </div>
      </div>
    );
  }
  return (
    <div className="location-not-selected"
      onMouseOver={() => props.showBalloon(props.event.id)}
      onMouseOut={() => props.showBalloon(null)}
      onClick={() => props.onEventListItemClick(props.event.id, [props.event.lat, props.event.lng])}
    />
  );
};

export default EventListItem;
