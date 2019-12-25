import React from 'react';
import { Item, Label, Icon, Segment } from 'semantic-ui-react';

const UserBio = ({ large }) => {
	return (
		<Segment>
			<Item.Content>
				<Item.Group unstackable={large}>
					<Item>
						<Item.Image
							avatar
							size="small"
							src="https://randomuser.me/api/portraits/men/20.jpg"
						/>

						<Item.Content verticalAlign="middle">
							<div>
								<strong style={{ marginBottom: '0.5rem', fontSize: '1.4rem' }}>
									First Name
								</strong>{' '}
								<span>(27 yrs)</span>
							</div>
							<p className="user-detail--content">
								<strong>Occupation: </strong> Software Engineer
							</p>
							<p className="user-detail--content">
								<strong>Lives in: </strong> London, UK
							</p>
							<p className="user-detail--content">
								<strong>Member Since: </strong> 26 March 2018
							</p>
							<p className="user-detail--content">
								<strong>Description: </strong>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
								quos ipsa assumenda, minus iste quia ex corporis modi officia
								doloribus sit debitis
							</p>
							<div className="user-detail--content">
								<Label.Group size="mini" color="teal">
									<strong>Interests: </strong>
									<Label>
										<Icon name="food" />
										Food
									</Label>
									<Label>
										<Icon name="group" />
										People
									</Label>
									<Label>
										<Icon name="motorcycle" />
										Travel
									</Label>
								</Label.Group>
							</div>
						</Item.Content>
					</Item>
				</Item.Group>
			</Item.Content>
		</Segment>
	);
};

export default UserBio;
