import React from 'react';
import {Button, Checkbox, Div, FormLayout, Group, Input, Panel, PanelHeader, View} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import qrCodeGenerator from '@vkontakte/vk-qr';
import Download from '@axetroy/react-download';
import Icon24Download from '@vkontakte/icons/dist/24/download';
import {saveSvgAsPng} from 'save-svg-as-png';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'https://vk.com',
            showLogo: true
        };

        this.svgRef = React.createRef();

        this.onChange = this.onChange.bind(this);
        this.savePNG = this.savePNG.bind(this);
    }

    savePNG() {
        saveSvgAsPng(this.svgRef.current.children[0], 'png.png')
    }

    onChange(e) {
        const {name, value, checked} = e.currentTarget;
        if (name === 'showLogo') {
            this.setState({[name]: checked});
        } else {
            this.setState({[name]: value});
        }
    }

    render() {
        const {url, showLogo} = this.state;

        const qrSvg = qrCodeGenerator.createQR(url, 256, 'classCode', showLogo);

        return (
            <View activePanel="mainPanel">
                <Panel id="mainPanel">
                    <PanelHeader>QR</PanelHeader>
                    <Group>
                        <FormLayout>
                            <Input
                                type="string"
                                top="Ссылка"
                                name="url"
                                value={url}
                                onChange={this.onChange}
                                status={url ? 'valid' : 'error'}
                                bottom={url ? '' : 'Введите ссылку'}
                            />

                            <Checkbox name="showLogo" checked={showLogo} onChange={this.onChange}>Использовать логотип
                                ВКонтакте</Checkbox>
                        </FormLayout>

                        <Div style={{
                            textAlign: 'center',
                        }}>
                            <span ref={this.svgRef} dangerouslySetInnerHTML={{__html: url ? qrSvg : ''}}/>
                        </Div>

                        <Div style={{display: 'flex', 'justifyContent': 'space-between'}}>
                            <Button before={<Icon24Download/>} size="xl" style={{maxWidth: 'calc(50% - 4px)'}}
                                    onClick={this.savePNG} stretched>PNG</Button>
                            <Download file="qr.svg" content={qrSvg} style={{flexGrow: 1, maxWidth: 'calc(50% - 4px)'}}>
                                <Button before={<Icon24Download/>} size="xl" stretched>SVG</Button>
                            </Download>
                        </Div>
                    </Group>
                </Panel>
            </View>
        );
    }
}

export default App;
