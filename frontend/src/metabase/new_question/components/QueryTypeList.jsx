import cxs from "cxs";
import React, { Component } from "react";
import { connect } from "react-redux";

import Text from "metabase/components/Text";
import Title from "metabase/components/Title";
import Surface from "metabase/components/Surface";

import { selectAndAdvance, selectFlow } from "../actions";

const QUERY_TYPES = [
    {
        name: "Explore",
        subtitle: "See data as a map, over time,or pivoted to help you understand trends or changes.",
        type: "explore"
    },
    {
        name: "View lists",
        subtitle: "Explore tables and see what’s going on underneath your charts.",
        type: "segment"
    },
    {
        name: "Write SQL",
        type: "sql",
        icon: "sql",
        subtitle: "Use SQL or other native languages for data prep or manipulation."
    }
];

const layout = cxs({
    flex: "0 0 33.33%",
    paddingLeft: "4em",
    paddingRight: "4em",
    height: 537
});

class Hoverable extends Component {
    render() {
        return this.props.children;
    }
}

const QueryTypeCard = ({ name, subtitle }) => (
    <Hoverable>
        <Surface>
            <div
                className={cxs({
                    textAlign: "center",
                    padding: "4em",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                })}
            >
                <div className={cxs({ flex: "0 0 66.66%", height: "100%" })}>
                    Illustration
                </div>
                <div className={cxs({ alignSelf: "flex-end" })}>
                    <Title>{name}</Title>
                    <Text>{subtitle}</Text>
                </div>
            </div>
        </Surface>
    </Hoverable>
);

@connect(() => ({}), {
    selectFlow: flowType => selectFlow(flowType),
    selectAndAdvance
})
class QueryTypeList extends Component {
    render() {
        const { selectFlow, selectAndAdvance } = this.props;
        return (
            <div
                className={cxs({
                    display: "flex",
                    height: "100%",
                    maxWidth: 1650,
                    marginLeft: "auto",
                    marginRight: "auto"
                })}
            >
                <ol className={cxs({ display: "flex", width: "100%" })}>
                    {QUERY_TYPES.map(type => (
                        <li
                            key={type.type}
                            onClick={() =>
                                selectAndAdvance(() => selectFlow(type.type))}
                            className={layout}
                        >
                            <QueryTypeCard {...type} />
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default QueryTypeList;