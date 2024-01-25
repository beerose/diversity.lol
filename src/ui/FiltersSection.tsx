import { SearchParamsSelect } from "@/ui/SearchParamsSelect";
import { sortOptions, filterOptions } from "@/utils/filters";

export const FiltersSection = () => {
	return (
		<section>
			<h2 className="sr-only">Filters</h2>

			<div className="bg-white pb-4">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-1">
					<SearchParamsSelect caption="Sort" name="sort" defaultValue="newest" options={sortOptions} />

					<div className="flow-root">
						<div>
							{filterOptions
								.filter((filter) => filter.options.length > 0)
								.map((filter) => {
									return (
										<SearchParamsSelect
											caption={filter.caption}
											name={filter.id}
											options={filter.options}
											key={filter.id}
										/>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
