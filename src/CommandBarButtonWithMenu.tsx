import {Callout, ICommandBarItemProps, IComponentAsProps} from "office-ui-fabric-react";
import React from "react";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    Droppable,
    DroppableProvided,
    DropResult
} from 'react-beautiful-dnd';

interface ICommandBarButtonWithMenuState {
    showMenu: boolean;
    messages: string[];
}

export class CommandBarButtonWithMenu extends React.Component<IComponentAsProps<ICommandBarItemProps>, ICommandBarButtonWithMenuState> {
    public state: ICommandBarButtonWithMenuState = {
        showMenu: false,
        messages: ["Good morning", "Good evening", "Good bye"]
    };

    public render() {
        if (!this.props.defaultRender) return null;

        return <>
            <div id="button-wrapper">
                <this.props.defaultRender {...this.props} onClick={(): void => {
                    this.setState({
                        showMenu: true
                    })
                }}/>
            </div>

            {this.state.showMenu &&
			<Callout
				target="#button-wrapper"
				shouldDismissOnWindowFocus={false}
				dismissOnTargetClick
				preventDismissOnLostFocus
				preventDismissOnResize
				preventDismissOnScroll
				isBeakVisible={false}
			>
				<div style={{padding: 20}}>
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId="default-list">
                            {(provided: DroppableProvided): React.ReactElement => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {this.renderMessages()}
                                    {provided.placeholder}
                                </div>
                            )}
						</Droppable>
					</DragDropContext>
				</div>
			</Callout>
            }
        </>;
    }

    private renderMessages(): JSX.Element {
        return <>{this.state.messages.map(
            (i, index): JSX.Element => {
                return (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided: DraggableProvided): React.ReactElement => (
                            <div
                                className="draggable-element"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                {i}
                            </div>
                        )}
                    </Draggable>
                );
            }
        )}</>
    }

    private onDragEnd = (result: DropResult): void => {
        if (!result?.source || !result.destination) return;

        const newMessages = [...this.state.messages];
        const [removed] = newMessages.splice(result.source.index, 1);
        newMessages.splice(result.destination.index, 0, removed);

        this.setState({
            messages: newMessages
        })
    };
}