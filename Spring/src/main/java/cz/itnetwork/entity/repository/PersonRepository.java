/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */
package cz.itnetwork.entity.repository;

import cz.itnetwork.dto.PersonStatistic;
import cz.itnetwork.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PersonRepository extends JpaRepository<PersonEntity, Long> {

    /**
     * Vyhledá hidden osoby
     * @param hidden "skrytá" osoba
     * @return Seznam skrytých "hidden" osob
     */
    List<PersonEntity> findByHidden(boolean hidden);

    /**
     * Vrací statistiky osob (celkový výdělek (revenue) každé osoby)
     * @return List objektů obsahujících id osoby, jméno osoby a celkový výdělek
     */
    @Query (value = "SELECT p.id AS personId, p.name AS personName, " +
            "COALESCE(SUM(i.price), 0) AS revenue FROM person p " +
            "LEFT JOIN invoice i ON p.id = i.buyer_id " +
            "GROUP BY p.id, p.name", nativeQuery = true)
    List<Object[]> getPersonStatistics();

}
