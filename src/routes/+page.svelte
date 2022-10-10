<script>
	import { GaugeChart } from '@carbon/charts-svelte';
	import { Grid, Row, Column, DataTable, Tag } from 'carbon-components-svelte';

	export let data;

	let gaugeHeight = '250px';
	let load = {
		...data.currentLoad
	};

	// Process
	let processesHeaders = [
		{ key: 'name', value: 'Name' },
		{ key: 'cpu', value: 'Cpu' },
		{ key: 'mem', value: 'Memory' },
		{ key: 'pid', value: 'PID' },
		{ key: 'state', value: 'State' },
		{ key: 'started', value: 'Started' }
	];
	let processesRows = data.processes.list
		.map((process, index) => {
			return {
				id: index,
				...process
			};
		})
		.sort((a, b) => ('' + a.state).localeCompare(b.state));
	console.log({ data });
</script>

<Grid>
	<Row>
		<Column>
			<GaugeChart
				data={[
					{
						group: 'value',
						value: load.avgLoad
					}
				]}
				options={{
					title: 'Avg. Load',
					resizable: false,
					height: gaugeHeight,
					width: '100%',
					theme: "g100",
					gauge: {
						type: 'full',
						status: 'danger'
					}
				}}
			/></Column
		>
		<Column>
			<GaugeChart
				data={[
					{
						group: 'value',
						value: load.currentLoadSystem
					}
				]}
				options={{
					title: 'System Load',
					resizable: false,
					height: gaugeHeight,
					width: '100%',
					theme: "g100",
					gauge: {
						type: 'full',
						status: 'danger'
					}
				}}
			/></Column
		>
		<Column>
			<GaugeChart
				data={[
					{
						group: 'value',
						value: load.currentLoad
					}
				]}
				options={{
					title: 'Current Load',
					resizable: false,
					height: gaugeHeight,
					width: '100%',
					theme: "g100",
					gauge: {
						type: 'full',
						status: 'danger'
					}
				}}
			/></Column
		>
		<Column>
			<GaugeChart
				data={[
					{
						group: 'value',
						value: load.currentLoadUser
					}
				]}
				options={{
					title: 'Current User Load',
					resizable: false,
					height: gaugeHeight,
					width: '100%',
					theme: "g100",
					gauge: {
						type: 'full',
						status: 'danger'
					}
				}}
			/></Column
		>
	</Row>
	<Row>
		<Column>
			<br /><br />
			<h4>Processes</h4>
			<br />
			<Tag>All: {data.processes.all}</Tag>
			<Tag>Blocked: {data.processes.blocked}</Tag>
			<Tag>Running: {data.processes.running}</Tag>
			<Tag>Sleeping: {data.processes.sleeping}</Tag>
			<Tag>Unknown: {data.processes.unknown}</Tag>
			<br />
			<br />
			<DataTable headers={processesHeaders} rows={processesRows} />
		</Column>
	</Row>
</Grid>
