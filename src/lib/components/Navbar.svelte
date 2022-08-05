<script>
	import { storeDateRange } from '../../stores';
	import { getWeekPeriod } from '../functions';
</script>

<nav class="bg-[#3232f5] border-b border-gray-200 fixed z-30 w-full">
	<div class="px-3 py-2 lg:px-5 lg:pl-3">
		<div class="flex items-center justify-between">
			<div class="flex items-center justify-start">
				<a class="text-xl font-bold flex text-white items-center lg:ml-2.5" href="about">
					<svg class="mr-2 mb-1" width="25" height="25" viewBox="0 0 31.685 31.685"
						><g id="Group_1" data-name="Group 1" transform="translate(0 0)"
							><path
								id="Path_6"
								data-name="Path 6"
								d="M347.679,351.941a5.257,5.257,0,0,0-5.161,4.1H352.8A5.289,5.289,0,0,0,347.679,351.941Z"
								transform="translate(-331.844 -342.25)"
								fill="#abcdef"
							/><path
								id="Path_7"
								data-name="Path 7"
								d="M98.5,110.56l-1.907-1.849s-.484-.367.483-1.3A15.811,15.811,0,1,0,92.2,111.25h0a1.44,1.44,0,0,1,1.244.119l2.167.982a1.034,1.034,0,0,0,1.1,0l1.792-1.187S98.933,110.906,98.5,110.56ZM94.8,98.5H78.666A6.465,6.465,0,0,0,90.1,101.2H94c-2.5,5.837-8.976,5.837-8.976,5.837a9.9,9.9,0,0,1-9.772-8.5,9.792,9.792,0,0,1,5.329-10.206A9.843,9.843,0,0,1,94.8,98.5Z"
								transform="translate(-69.185 -81.278)"
								fill="#abcdef"
							/></g
						></svg
					>
					<span class="self-center whitespace-nowrap text-white">EQ Works</span>
				</a>
				<div class="flex space-x-20 ml-10 font-semibold text-white">
					{getWeekPeriod($storeDateRange)}
				</div>
			</div>
		</div>
	</div>
</nav>
