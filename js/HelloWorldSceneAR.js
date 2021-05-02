'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroBox,
    ViroMaterials,
    ViroConstants,
    Viro3DObject,
    ViroAmbientLight,
    ViroARPlaneSelector,
    ViroNode,
    ViroSpotLight
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

    constructor() {
        super();

        // Set initial state here
        this.state = {
            text : "Initializing AR hahaahah..."
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
    }

    render() {
        return (
            <ViroARScene onTrackingUpdated={this._onInitialized} >
                <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
                    <Viro3DObject
                        source={require('./res/emoji_smile/emoji_smile.vrx')}
                        resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                            require('./res/emoji_smile/emoji_smile_normal.png'),
                            require('./res/emoji_smile/emoji_smile_specular.png')]}
                        position={[0, .5, 0]}
                        scale={[.2, .2, .2]}
                        type="VRX" />
                </ViroNode>

                {/*<ViroText text={this.state.text} scale={[.6, .6, .6]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />*/}
                {/*<ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} />*/}

                <ViroAmbientLight color={"#aaaaaa"} />

                <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
                               position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

            </ViroARScene>
        );
    }

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text : "Niko puta"
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
        }
    }
}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 10,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});

ViroMaterials.createMaterials({
    grid: {
        diffuseTexture: require('./res/grid_bg.jpg'),
    },
});

module.exports = HelloWorldSceneAR;
