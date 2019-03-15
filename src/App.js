import React from 'react';
import {Button, Div, FormLayout, Group, Input, ListItem, Panel, PanelHeader, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import qrCodeGenerator from '@vkontakte/vk-qr';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    svg(url) {
        let segs = qrCodeGenerator.QrSegment.makeSegments(url);
        let svg = qrCodeGenerator.QrCode.encodeSegments(segs, qrCodeGenerator.QrCode.Ecc.QUARTILE, 1, 40, -1, true).toSvgString();

        return <span dangerouslySetInnerHTML={{__html: url ? svg : ''}}/>;
    }

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    render() {
        const {url} = this.state;

        return (
            <View activePanel="mainPanel">
                <Panel id="mainPanel">
                    <PanelHeader>QR</PanelHeader>
                    <FormLayout>
                        <Input
                            type="string"
                            top="URL"
                            name="url"
                            value={url}
                            onChange={this.onChange}
                            status={url ? 'valid' : 'error'}
                            bottom={url ? '' : 'Введите URL'}
                        />
                    </FormLayout>

                    <Group>
                        <Div>
                            {this.svg(url)}
                        </Div>
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default App;
