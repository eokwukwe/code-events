import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { Comment } from 'semantic-ui-react';

import EventDetailedChatForm from './EventDetailedChatForm';

const EventDetailedComment = ({
	comment,
	showReplyForm,
	addEventComment,
	eventId,
	handleOpenReplyForm,
}) => {
	return (
		<Comment key={comment.id}>
			<Comment.Avatar src={comment.photoURL} />
			<Comment.Content>
				<Comment.Author as={Link} to={`/profile/${comment.uid}`}>
					{comment.displayName}
				</Comment.Author>
				<Comment.Metadata>
					<div>
						{formatDistance(comment.date, Date.now(), {
							addSuffix: true,
						})}
					</div>
				</Comment.Metadata>
				<Comment.Text>{comment.text}</Comment.Text>
				<Comment.Actions>
					<Comment.Action onClick={handleOpenReplyForm}>Reply</Comment.Action>
					{showReplyForm && (
            <EventDetailedChatForm
							addEventComment={addEventComment}
              eventId={eventId}
						/>
					)}
				</Comment.Actions>
			</Comment.Content>
		</Comment>
	);
};

export default EventDetailedComment;
